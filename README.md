# Lab05: Docker Compose - Thực hành Các Lệnh Docker Compose

**Họ và tên:** Trần Long Vũ  
**MSSV:** 22717471

---

## Mức tiêu mục

Bài thực hành này tập trung vào **Docker Compose** - công cụ để định nghĩa và chạy nhiều container Docker cùng một lúc. Bài được chia thành ba phần với độ phức tạp tăng dần.

**Mục tiêu:** Nắm vững cách viết Docker Compose file, quản lý khởi chạy nhiều container, triển khai ứng dụng đa dịch vụ và quản lý cơ sở hạ tầng bằng Docker Compose.

---

## Cấu trúc bài tập

### **Phần 1: Các lệnh Docker Compose cơ bản**

Thực hành các lệnh cơ bản nhất của Docker Compose:

- `docker compose version` - Hiển thị thông tin phiên bản
- `docker compose up` / `docker compose up -d` - Khởi chạy các dịch vụ
- `docker compose ps` - Liệt kê các container đang chạy
- `docker compose down` / `docker compose down -v` - Dừng và xóa container+volume
- `docker compose restart` - Khởi động lại dịch vụ
- `docker compose logs -f` - Xem log theo thời gian thực
- `docker compose build` / `docker compose up -d --build` - Build và chạy
- `docker compose exec` - Thực thi lệnh trong container
- `docker compose run` - Chạy một lệnh một lần
- `docker compose stop/rm` - Dừng hoặc xóa dịch vụ cụ thể
- `docker compose config` - Kiểm tra tính hợp lệ của file

---

### **Phần 2: Docker Compose File - 15 Bài tập**

| Bài        | Mô tả                         | Công nghệ sử dụng                |
| ---------- | ----------------------------- | -------------------------------- |
| **Bài 1**  | Chạy container Nginx đơn giản | Nginx, Port Mapping (8080→80)    |
| **Bài 2**  | Thiết lập MySQL               | MySQL 8.0, Biến môi trường       |
| **Bài 3**  | MySQL + PHPMyAdmin            | MySQL, PHPMyAdmin (cổng 8081)    |
| **Bài 4**  | Node.js với Express           | Node.js, Express Framework       |
| **Bài 5**  | Dịch vụ Redis                 | Redis Cache (cổng 6379)          |
| **Bài 6**  | WordPress + MySQL             | WordPress, MySQL Database        |
| **Bài 7**  | MongoDB + Mongo Express       | Quản lý cơ sở dữ liệu NoSQL      |
| **Bài 8**  | Node.js + MySQL               | Giao tiếp đa dịch vụ             |
| **Bài 9**  | Ứng dụng Python Flask         | Flask, Redis Cache               |
| **Bài 10** | Docker Volumes                | Lưu trữ dữ liệu với MySQL        |
| **Bài 11** | PostgreSQL + Adminer          | PostgreSQL, UI quản lý DB (8083) |
| **Bài 12** | Prometheus + Grafana          | Stack giám sát, thu thập metrics |
| **Bài 13** | React + Nginx                 | Ứng dụng React với Nginx         |
| **Bài 14** | Cấu hình mạng riêng           | Giao tiếp giữa các container     |
| **Bài 15** | Giới hạn tài nguyên           | Giới hạn CPU/RAM cho container   |

---

### **Phần 3: Ứng dụng Docker Compose nâng cao (8 Bài tập)**

| Bài tập       | Mô tả                            | Kiến trúc                                           |
| ------------- | -------------------------------- | --------------------------------------------------- |
| **Bài tập 1** | Stack WordPress                  | WordPress + MySQL + Volumes + Custom Network        |
| **Bài tập 2** | Node.js + MongoDB                | REST API + NoSQL + Health Check                     |
| **Bài tập 4** | ELK Stack (Prometheus + Grafana) | Giám sát Container & Trực quan hóa                  |
| **Bài tập 5** | Ứng dụng Voting đa tầng          | 5 Dịch vụ: Python, Node.js, Redis, Java, PostgreSQL |
| **Bài tập 7** | Elasticsearch + Kibana           | Stack phân tích log & Trực quan hóa                 |
| **Bài tập 8** | Django + Celery + Redis          | Hàng đợi tác vụ không đồng bộ                       |
| **Bài tập 9** | Nextcloud + MariaDB + Redis      | Đám mây tự lưu trữ với DB & Cache                   |

---

## Các khái niệm chính

**Quản lý Dịch vụ** - Quản lý nhiều container như một ứng dụng thống nhất  
**Biến Môi trường** - Cấu hình dịch vụ mà không hardcode giá trị  
**Quản lý Volume** - Lưu trữ dữ liệu bền vững  
**Mạng Container** - Giao tiếp giữa các dịch vụ  
**Health Check & Dependencies** - Đảm bảo thứ tự khởi động đúng  
**Port Mapping** - Expose dịch vụ container ra host  
**Ứng dụng Đa tầng** - Kiến trúc phức tạp với nhiều dịch vụ  
**Giám sát & Ghi log** - Theo dõi sức khỏe hệ thống bằng Prometheus & Grafana  
**Giới hạn Tài nguyên** - Ràng buộc CPU và RAM cho container

---

## Hướng dẫn Bắt đầu nhanh

### Chạy bất kỳ bài tập nào:

```bash
# Chuyển đến thư mục bài tập
cd part_02/bai04  # hoặc bài tập khác

# Khởi chạy tất cả các dịch vụ
docker compose up -d

# Kiểm tra trạng thái dịch vụ
docker compose ps

# Xem log
docker compose logs -f

# Dừng dịch vụ
docker compose down

# Dừng và xóa volume
docker compose down -v
```

---

## Công nghệ sử dụng

- **Container hóa:** Docker & Docker Compose
- **Web Server:** Nginx
- **Cơ sở dữ liệu:** MySQL, PostgreSQL, MongoDB, MariaDB
- **Cache:** Redis
- **Ngôn ngữ:** Python, Node.js, Java
- **Framework:** Flask, Express
- **Giám sát:** Prometheus, Grafana
- **Phân tích Log:** Elasticsearch, Kibana
- **Task Queue:** Celery
- **CMS/Cloud:** WordPress, Nextcloud
- **UI Tools:** PHPMyAdmin, Adminer, Mongo Express, Kibana

---
