import redis.clients.jedis.Jedis;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Worker {
    private static final int MAX_RETRIES = 30;
    private static final int RETRY_DELAY = 2000; // 2 seconds

    public static void main(String[] args) throws Exception {
        Jedis redis = null;
        Connection conn = null;

        // Wait for Redis to be ready
        System.out.println("Connecting to Redis...");
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                redis = new Jedis("redis", 6379);
                redis.ping();
                System.out.println("Connected to Redis");
                break;
            } catch (Exception e) {
                System.out.println("Redis not ready, retrying... (" + (i + 1) + "/" + MAX_RETRIES + ")");
                Thread.sleep(RETRY_DELAY);
                if (i == MAX_RETRIES - 1) {
                    throw new Exception("Failed to connect to Redis after " + MAX_RETRIES + " attempts");
                }
            }
        }

        // Wait for PostgreSQL to be ready
        System.out.println("Connecting to PostgreSQL...");
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                conn = DriverManager.getConnection(
                    "jdbc:postgresql://db:5432/votes",
                    "postgres",
                    "postgres"
                );
                System.out.println("Connected to PostgreSQL");
                
                // Create table if it doesn't exist
                conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS votes (id SERIAL PRIMARY KEY, vote VARCHAR(10), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
                );
                System.out.println("Votes table ready");
                break;
            } catch (Exception e) {
                System.out.println("PostgreSQL not ready, retrying... (" + (i + 1) + "/" + MAX_RETRIES + ")");
                Thread.sleep(RETRY_DELAY);
                if (i == MAX_RETRIES - 1) {
                    throw new Exception("Failed to connect to PostgreSQL after " + MAX_RETRIES + " attempts");
                }
            }
        }
        
        int processedCount = 0;
        while (true) {
            try {
                String vote = redis.rpop("votes");
                if (vote != null) {
                    try {
                        PreparedStatement stmt = conn.prepareStatement(
                            "INSERT INTO votes(vote) VALUES (?)"
                        );
                        stmt.setString(1, vote);
                        stmt.executeUpdate();
                        processedCount++;
                        System.out.println("Saved vote: " + vote + " (total: " + processedCount + ")");
                    } catch (Exception e) {
                        System.err.println("Error saving vote: " + e.getMessage());
                    }
                }
                Thread.sleep(1000);
            } catch (Exception e) {
                System.err.println("Error in worker loop: " + e.getMessage());
                Thread.sleep(5000);
            }
        }
    }
}