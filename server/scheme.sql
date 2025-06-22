-- Drop and recreate the database
DROP DATABASE IF EXISTS dnfresh;
CREATE DATABASE dnfresh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dnfresh;

-- Table: TINHTHANHPHO
CREATE TABLE TINHTHANHPHO (
    maTinhThanhPho VARCHAR(5) PRIMARY KEY,
    tenTinhThanhPho VARCHAR(255)
);

-- Table: PHUONGXA
CREATE TABLE PHUONGXA (
    maPhuongXa VARCHAR(10) PRIMARY KEY,
    tenPhuongXa VARCHAR(255),
    maTinhThanhPho VARCHAR(5),
    FOREIGN KEY (maTinhThanhPho) REFERENCES TINHTHANHPHO(maTinhThanhPho)
);

-- Table: DIACHI
CREATE TABLE DIACHI (
    maDiaChi VARCHAR(255) PRIMARY KEY,
    chiTietDiaChi VARCHAR(255),
    maPhuongXa VARCHAR(10),
    FOREIGN KEY (maPhuongXa) REFERENCES PHUONGXA(maPhuongXa)
);

-- Table: VAITRO
CREATE TABLE VAITRO (
    maVaiTro VARCHAR(5) PRIMARY KEY,
    tenVaiTro VARCHAR(255),
    moTa TEXT
);

-- Table: NGUOIDUNG
CREATE TABLE NGUOIDUNG (
    maNguoiDung VARCHAR(10) PRIMARY KEY,
    hoTen VARCHAR(255),
    gioiTinh TINYINT,
    ngaySinh DATE,
    soDienThoai VARCHAR(11),
    maDiaChi VARCHAR(255),
    email VARCHAR(255),
    matKhau VARCHAR(255),
    hinhAnh TEXT,
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    trangThai TINYINT,
    FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
);

-- Table: VAITRONGUOIDUNG
CREATE TABLE VAITRONGUOIDUNG (
    maNguoiDung VARCHAR(10),
    maVaiTro VARCHAR(5),
    PRIMARY KEY (maNguoiDung, maVaiTro),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maVaiTro) REFERENCES VAITRO(maVaiTro)
);

-- Table: DANHMUC
CREATE TABLE DANHMUC (
    maDanhMuc VARCHAR(6) PRIMARY KEY,
    tenDanhMuc VARCHAR(255),
    moTa TEXT,
    trangThai TINYINT,
    ngayTao DATETIME,
    ngayCapNhat DATETIME
);

-- Table: NHACUNGCAP
CREATE TABLE NHACUNGCAP (
    maNhaCungCap VARCHAR(6) PRIMARY KEY,
    tenNhaCungCap VARCHAR(255),
    moTa TEXT,
    ngayThanhLap DATE,
    ngayDangKy DATETIME,
    maDiaChi VARCHAR(255),
    trangThaiHoatDong TINYINT,
    giayToPhapLy TEXT,
    ngayCapNhat DATETIME,
    FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
);

-- Table: DANHMUCNHACUNGCAP
CREATE TABLE DANHMUCNHACUNGCAP (
    maNhaCungCap VARCHAR(6),
    maDanhMuc VARCHAR(6),
    PRIMARY KEY (maNhaCungCap, maDanhMuc),
    FOREIGN KEY (maNhaCungCap) REFERENCES NHACUNGCAP(maNhaCungCap),
    FOREIGN KEY (maDanhMuc) REFERENCES DANHMUC(maDanhMuc)
);

-- Table: KHOTHUCPHAM
CREATE TABLE KHOTHUCPHAM (
    maThucPham VARCHAR(10) PRIMARY KEY,
    tenThucPham VARCHAR(255),
    donGia INT,
    moTa TEXT,
    trangThai TINYINT,
    maDanhMuc VARCHAR(6),
    tiLeKhuyenMai DECIMAL(4, 2),
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    soLuongTonKho SMALLINT,
    donViTinh VARCHAR(6),
    soLuongChoXuat SMALLINT,
    FOREIGN KEY (maDanhMuc) REFERENCES DANHMUC(maDanhMuc)
);

-- Table: ANHTHUCPHAM
CREATE TABLE ANHTHUCPHAM (
    maAnh VARCHAR(255) PRIMARY KEY,
    maThucPham VARCHAR(10),
    hinhAnh TEXT,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Table: PHIEUNHAP
CREATE TABLE PHIEUNHAP (
    maPhieuNhap VARCHAR(255) PRIMARY KEY,
    ngayNhapHang DATETIME,
    ghiChu TEXT,
    maNhanVien VARCHAR(10),
    trangThai TINYINT,
    maQuanTriVien VARCHAR(6),
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    maNhaCungCap VARCHAR(6),
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maNhaCungCap) REFERENCES NHACUNGCAP(maNhaCungCap)
);

-- Table: CHITIETTHUCPHAMNHAP
CREATE TABLE CHITIETTHUCPHAMNHAP (
    maCTTPNhap VARCHAR(255) PRIMARY KEY,
    maLoHang VARCHAR(255),
    maPhieuNhap VARCHAR(255),
    maThucPham VARCHAR(10),
    ngaySanXuat DATETIME,
    hanSuDung DATETIME,
    donGiaNhap DECIMAL(10, 2),
    soLuong SMALLINT,
    FOREIGN KEY (maPhieuNhap) REFERENCES PHIEUNHAP(maPhieuNhap),
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Table: PHIEUXUAT
CREATE TABLE PHIEUXUAT (
    maPhieuXuat VARCHAR(255) PRIMARY KEY,
    ngayXuatHang DATETIME,
    ghiChu TEXT,
    maNhanVien VARCHAR(10),
    trangThai TINYINT,
    maQuanTriVien VARCHAR(10),
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
);

-- Table: CHITIETPHIEUXUAT
CREATE TABLE CHITIETPHIEUXUAT (
    maPhieuXuat VARCHAR(255),
    maThucPham VARCHAR(10),
    maLoHang VARCHAR(255),
    soLuong SMALLINT,
    PRIMARY KEY (maPhieuXuat, maLoHang, maThucPham),
    FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat),
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Table: DONHANG
CREATE TABLE DONHANG (
    maDonHang VARCHAR(255) PRIMARY KEY,
    maKhachHang VARCHAR(10),
    maDiaChi VARCHAR(255),
    maNhanVien VARCHAR(10),
    maPhieuXuat VARCHAR(255),
    trangThai TINYINT,
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    ghiChu TEXT,
    phuongThucThanhToan TINYINT,
    FOREIGN KEY (maKhachHang) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi),
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat)
);

-- Table: CHITIETDONHANG
CREATE TABLE CHITIETDONHANG (
    maDonHang VARCHAR(255),
    maThucPham VARCHAR(10),
    soLuong SMALLINT,
    PRIMARY KEY (maDonHang, maThucPham),
    FOREIGN KEY (maDonHang) REFERENCES DONHANG(maDonHang),
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Table: THUCPHAMYEUTHICH
CREATE TABLE THUCPHAMYEUTHICH (
    maNguoiDung VARCHAR(10),
    maThucPham VARCHAR(10),
    ngayTao DATETIME,
    PRIMARY KEY (maNguoiDung, maThucPham),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Table: CALAMVIEC
CREATE TABLE CALAMVIEC (
    maCaLam VARCHAR(5) PRIMARY KEY,
    thoiGianBatDau TIME,
    thoiGianKetThuc TIME
);

-- Table: LICHLAMVIEC
CREATE TABLE LICHLAMVIEC (
    maNhanVien VARCHAR(10),
    maQuanTriVien VARCHAR(10),
    maCaLam VARCHAR(5),
    ngayLamViec DATE,
    khuVuc VARCHAR(255),
    ngayTao DATETIME,
    ngayCapNhat DATETIME,
    PRIMARY KEY (maNhanVien, maCaLam),
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maCaLam) REFERENCES CALAMVIEC(maCaLam)
);

-- Table: GIOHANG
CREATE TABLE GIOHANG (
    maNguoiDung VARCHAR(10),
    maThucPham VARCHAR(10),
    soLuong SMALLINT,
    ngayTao DATETIME,
    PRIMARY KEY (maNguoiDung, maThucPham),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung),
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
);

-- Insert sample data for TINHTHANHPHO
INSERT INTO TINHTHANHPHO (maTinhThanhPho, tenTinhThanhPho) VALUES
('TPHCM', 'Thành phố Hồ Chí Minh'),
('HN', 'Hà Nội'),
('DN', 'Đà Nẵng');

-- Insert sample data for PHUONGXA
INSERT INTO PHUONGXA (maPhuongXa, tenPhuongXa, maTinhThanhPho) VALUES
('PX001', 'Phường 1', 'TPHCM'),
('PX002', 'Phường 2', 'TPHCM'),
('PX003', 'Phường 3', 'HN');

-- Insert sample data for DIACHI
INSERT INTO DIACHI (maDiaChi, chiTietDiaChi, maPhuongXa) VALUES
('DC001', '123 Đường A', 'PX001'),
('DC002', '456 Đường B', 'PX002'),
('DC003', '789 Đường C', 'PX003');

-- Insert sample data for VAITRO
INSERT INTO VAITRO (maVaiTro, tenVaiTro, moTa) VALUES
('VT001', 'Quản trị viên', 'Quản lý hệ thống'),
('VT002', 'Nhân viên kho', 'Nhân viên kho'),
('VT003', 'Nhân viên giao hàng', 'Nhân viên giao hàng'),
('VT004', 'Khách hàng', 'Người mua hàng');

-- Insert sample data for NGUOIDUNG
INSERT INTO NGUOIDUNG (maNguoiDung, hoTen, gioiTinh, ngaySinh, soDienThoai, maDiaChi, email, matKhau, hinhAnh, ngayTao, ngayCapNhat, trangThai) VALUES
('ND001', 'Nguyễn Văn A', 1, '1990-01-01', '0901234567', 'DC001', 'a@gmail.com', 'password123', NULL, NOW(), NOW(), 1),
('ND002', 'Trần Thị B', 0, '1995-05-05', '0912345678', 'DC002', 'b@gmail.com', 'password456', NULL, NOW(), NOW(), 1),
('ND003', 'Lê Văn C', 1, '1985-03-15', '0923456789', 'DC003', 'c@gmail.com', 'password789', NULL, NOW(), NOW(), 1);

-- Insert sample data for VAITRONGUOIDUNG
INSERT INTO VAITRONGUOIDUNG (maNguoiDung, maVaiTro) VALUES
('ND001', 'VT001'),
('ND002', 'VT002'),
('ND003', 'VT003');

-- Insert sample data for DANHMUC
INSERT INTO DANHMUC (maDanhMuc, tenDanhMuc, moTa, trangThai, ngayTao, ngayCapNhat) VALUES
('DM001', 'Rau củ', 'Các loại rau củ tươi', 1, NOW(), NOW()),
('DM002', 'Thịt', 'Các loại thịt tươi', 1, NOW(), NOW()),
('DM003', 'Hải sản', 'Các loại hải sản tươi', 1, NOW(), NOW());

-- Insert sample data for NHACUNGCAP
INSERT INTO NHACUNGCAP (maNhaCungCap, tenNhaCungCap, moTa, ngayThanhLap, ngayDangKy, maDiaChi, trangThaiHoatDong, giayToPhapLy, ngayCapNhat) VALUES
('NCC001', 'Công ty A', 'Nhà cung cấp rau củ', '2000-01-01', NOW(), 'DC001', 1, 'Giấy phép kinh doanh A', NOW()),
('NCC002', 'Công ty B', 'Nhà cung cấp thịt', '2005-05-05', NOW(), 'DC002', 1, 'Giấy phép kinh doanh B', NOW());

-- Insert sample data for DANHMUCNHACUNGCAP
INSERT INTO DANHMUCNHACUNGCAP (maNhaCungCap, maDanhMuc) VALUES
('NCC001', 'DM001'),
('NCC002', 'DM002');

-- Insert sample data for KHOTHUCPHAM
INSERT INTO KHOTHUCPHAM (maThucPham, tenThucPham, donGia, moTa, trangThai, maDanhMuc, tiLeKhuyenMai, ngayTao, ngayCapNhat, soLuongTonKho, donViTinh) VALUES
('TP001', 'Cà rốt', 20000, 'Cà rốt tươi', 1, 'DM001', 0.10, NOW(), NOW(), 100, 'kg'),
('TP002', 'Thịt bò', 150000, 'Thịt bò tươi', 1, 'DM002', 0.15, NOW(), NOW(), 50, 'kg'),
('TP003', 'Tôm', 300000, 'Tôm tươi', 1, 'DM003', 0.20, NOW(), NOW(), 30, 'kg');

-- Insert sample data for ANHTHUCPHAM
INSERT INTO ANHTHUCPHAM (maAnh, maThucPham, hinhAnh) VALUES
('IMG001', 'TP001', 'carrot.jpg'),
('IMG002', 'TP002', 'beef.jpg'),
('IMG003', 'TP003', 'shrimp.jpg');

-- Insert sample data for PHIEUNHAP
INSERT INTO PHIEUNHAP (maPhieuNhap, ngayNhapHang, ghiChu, maNhanVien, trangThai, maQuanTriVien, ngayTao, ngayCapNhat, maNhaCungCap) VALUES
('PN001', NOW(), 'Nhập hàng rau củ', 'ND002', 1, 'ND001', NOW(), NOW(), 'NCC001'),
('PN002', NOW(), 'Nhập hàng thịt', 'ND002', 1, 'ND001', NOW(), NOW(), 'NCC002');

-- Insert sample data for CHITIETTHUCPHAMNHAP
INSERT INTO CHITIETTHUCPHAMNHAP (maLoHang, maPhieuNhap, maThucPham, ngaySanXuat, hanSuDung, donGiaNhap, soLuong) VALUES
('LH001', 'PN001', 'TP001', NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 18000, 50),
('LH002', 'PN002', 'TP002', NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 140000, 20);

-- Insert sample data for PHIEUXUAT
INSERT INTO PHIEUXUAT (maPhieuXuat, ngayXuatHang, ghiChu, maNhanVien, trangThai, maQuanTriVien, ngayTao, ngayCapNhat) VALUES
('PX001', NOW(), 'Xuất hàng rau củ', 'ND002', 1, 'ND001', NOW(), NOW());

-- Insert sample data for CHITIETPHIEUXUAT
INSERT INTO CHITIETPHIEUXUAT (maPhieuXuat, maThucPham, maLoHang, soLuong) VALUES
('PX001', 'TP001', 'LH001', 10);

-- Insert sample data for DONHANG
INSERT INTO DONHANG (maDonHang, maKhachHang, maDiaChi, maNhanVien, maPhieuXuat, trangThai, ngayTao, ngayCapNhat, ghiChu, phuongThucThanhToan) VALUES
('DH001', 'ND003', 'DC003', 'ND002', 'PX001', 1, NOW(), NOW(), 'Giao hàng nhanh', 1);

-- Insert sample data for CHITIETDONHANG
INSERT INTO CHITIETDONHANG (maDonHang, maThucPham, soLuong) VALUES
('DH001', 'TP001', 5);

-- Insert sample data for THUCHAMYEUTHICH
INSERT INTO THUCHAMYEUTHICH (maNguoiDung, maThucPham, ngayTao) VALUES
('ND003', 'TP001', NOW());

-- Insert sample data for CALAMVIEC
INSERT INTO CALAMVIEC (maCaLam, thoiGianBatDau, thoiGianKetThuc) VALUES
('CL001', '08:00:00', '12:00:00'),
('CL002', '13:00:00', '17:00:00'),
('CL003', '18:00:00', '22:00:00');

-- Insert sample data for LICHLAMVIEC
INSERT INTO LICHLAMVIEC (maNhanVien, maQuanTriVien, maCaLam, ngayLamViec, khuVuc, ngayTao, ngayCapNhat) VALUES
('ND002', 'ND001', 'CL001', '2025-04-18', 'Quận 1', NOW(), NOW()),
('ND002', 'ND001', 'CL002', '2025-04-18', 'Quận 1', NOW(), NOW());

-- Add ON DELETE CASCADE and ON UPDATE CASCADE for possible foreign keys

ALTER TABLE PHUONGXA
    DROP FOREIGN KEY PHUONGXA_ibfk_1,
    ADD CONSTRAINT FK_PHUONGXA_TINHTHANHPHO
        FOREIGN KEY (maTinhThanhPho) REFERENCES TINHTHANHPHO(maTinhThanhPho)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE DIACHI
    DROP FOREIGN KEY DIACHI_ibfk_1,
    ADD CONSTRAINT FK_DIACHI_PHUONGXA
        FOREIGN KEY (maPhuongXa) REFERENCES PHUONGXA(maPhuongXa)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE NGUOIDUNG
    DROP FOREIGN KEY NGUOIDUNG_ibfk_1,
    ADD CONSTRAINT FK_NGUOIDUNG_DIACHI
        FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE VAITRONGUOIDUNG
    DROP FOREIGN KEY VAITRONGUOIDUNG_ibfk_1,
    DROP FOREIGN KEY VAITRONGUOIDUNG_ibfk_2,
    ADD CONSTRAINT FK_VAITRONGUOIDUNG_NGUOIDUNG
        FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_VAITRONGUOIDUNG_VAITRO
        FOREIGN KEY (maVaiTro) REFERENCES VAITRO(maVaiTro)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE NHACUNGCAP
    DROP FOREIGN KEY NHACUNGCAP_ibfk_1,
    ADD CONSTRAINT FK_NHACUNGCAP_DIACHI
        FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE DANHMUCNHACUNGCAP
    DROP FOREIGN KEY DANHMUCNHACUNGCAP_ibfk_1,
    DROP FOREIGN KEY DANHMUCNHACUNGCAP_ibfk_2,
    ADD CONSTRAINT FK_DANHMUCNHACUNGCAP_NHACUNGCAP
        FOREIGN KEY (maNhaCungCap) REFERENCES NHACUNGCAP(maNhaCungCap)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_DANHMUCNHACUNGCAP_DANHMUC
        FOREIGN KEY (maDanhMuc) REFERENCES DANHMUC(maDanhMuc)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE KHOTHUCPHAM
    DROP FOREIGN KEY KHOTHUCPHAM_ibfk_1,
    ADD CONSTRAINT FK_KHOTHUCPHAM_DANHMUC
        FOREIGN KEY (maDanhMuc) REFERENCES DANHMUC(maDanhMuc)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ANHTHUCPHAM
    DROP FOREIGN KEY ANHTHUCPHAM_ibfk_1,
    ADD CONSTRAINT FK_ANHTHUCPHAM_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PHIEUNHAP
    DROP FOREIGN KEY PHIEUNHAP_ibfk_1,
    DROP FOREIGN KEY PHIEUNHAP_ibfk_2,
    DROP FOREIGN KEY PHIEUNHAP_ibfk_3,
    ADD CONSTRAINT FK_PHIEUNHAP_NHANVIEN
        FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_PHIEUNHAP_QUANTRIVIEN
        FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_PHIEUNHAP_NHACUNGCAP
        FOREIGN KEY (maNhaCungCap) REFERENCES NHACUNGCAP(maNhaCungCap)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE CHITIETTHUCPHAMNHAP
    DROP FOREIGN KEY CHITIETTHUCPHAMNHAP_ibfk_1,
    DROP FOREIGN KEY CHITIETTHUCPHAMNHAP_ibfk_2,
    ADD CONSTRAINT FK_CTTN_PHIEUNHAP
        FOREIGN KEY (maPhieuNhap) REFERENCES PHIEUNHAP(maPhieuNhap)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_CTTN_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PHIEUXUAT
    DROP FOREIGN KEY PHIEUXUAT_ibfk_1,
    DROP FOREIGN KEY PHIEUXUAT_ibfk_2,
    ADD CONSTRAINT FK_PHIEUXUAT_NHANVIEN
        FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_PHIEUXUAT_QUANTRIVIEN
        FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE CHITIETPHIEUXUAT
    DROP FOREIGN KEY CHITIETPHIEUXUAT_ibfk_1,
    DROP FOREIGN KEY CHITIETPHIEUXUAT_ibfk_2,
    DROP FOREIGN KEY CHITIETPHIEUXUAT_ibfk_3,
    ADD CONSTRAINT FK_CTPX_PHIEUXUAT
        FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_CTPX_LOHANG
        FOREIGN KEY (maLoHang) REFERENCES CHITIETTHUCPHAMNHAP(maLoHang)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_CTPX_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE DONHANG
    DROP FOREIGN KEY DONHANG_ibfk_1,
    DROP FOREIGN KEY DONHANG_ibfk_2,
    DROP FOREIGN KEY DONHANG_ibfk_3,
    DROP FOREIGN KEY DONHANG_ibfk_4,
    ADD CONSTRAINT FK_DONHANG_KHACHHANG
        FOREIGN KEY (maKhachHang) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_DONHANG_DIACHI
        FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_DONHANG_NHANVIEN
        FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_DONHANG_PHIEUXUAT
        FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE CHITIETDONHANG
    DROP FOREIGN KEY CHITIETDONHANG_ibfk_1,
    DROP FOREIGN KEY CHITIETDONHANG_ibfk_2,
    ADD CONSTRAINT FK_CTDH_DONHANG
        FOREIGN KEY (maDonHang) REFERENCES DONHANG(maDonHang)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_CTDH_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE THUCPHAMYEUTHICH
    DROP FOREIGN KEY THUCPHAMYEUTHICH_ibfk_1,
    DROP FOREIGN KEY THUCPHAMYEUTHICH_ibfk_2,
    ADD CONSTRAINT FK_TPYT_NGUOIDUNG
        FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_TPYT_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE LICHLAMVIEC
    DROP FOREIGN KEY LICHLAMVIEC_ibfk_1,
    DROP FOREIGN KEY LICHLAMVIEC_ibfk_2,
    DROP FOREIGN KEY LICHLAMVIEC_ibfk_3,
    ADD CONSTRAINT FK_LLV_NHANVIEN
        FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_LLV_QUANTRIVIEN
        FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT FK_LLV_CALAMVIEC
        FOREIGN KEY (maCaLam) REFERENCES CALAMVIEC(maCaLam)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE GIOHANG
    DROP FOREIGN KEY GIOHANG_ibfk_1,
    DROP FOREIGN KEY GIOHANG_ibfk_2,
    ADD CONSTRAINT FK_GH_NGUOIDUNG
        FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE ON UPDATE CASCADE,    
    ADD CONSTRAINT FK_GH_KHOTHUCPHAM
        FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE ON UPDATE CASCADE;

-- Trigger

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongTonKho_phieunhap
AFTER UPDATE ON phieunhap
FOR EACH ROW
BEGIN
	IF OLD.trangThai <> 1 AND NEW.trangThai = 1 THEN
		UPDATE khothucpham AS tp
        JOIN chitietthucphamnhap AS cttp ON cttp.maThucPham = tp.maThucPham
        SET tp.soLuongTonKho = tp.soLuongTonKho + cttp.soLuong
        WHERE cttp.maPhieuNhap = NEW.maPhieuNhap;
	END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongTonKho_phieuxuat
AFTER UPDATE ON phieuxuat
FOR EACH ROW
BEGIN
	IF OLD.trangThai <> 1 AND NEW.trangThai = 1 THEN
		UPDATE khothucpham AS tp
        JOIN chitietphieuxuat AS ctpx ON ctpx.maThucPham = tp.maThucPham
        SET tp.soLuongTonKho = tp.soLuongTonKho - ctpx.soLuong, tp.soLuongChoXuat = tp.soLuongChoXuat - ctpx.soLuong
        WHERE ctpx.maPhieuXuat = NEW.maPhieuXuat;

        UPDATE chitietthucphamnhap AS cttp
        JOIN chitietphieuxuat AS ctpx ON ctpx.maLoHang = cttp.maLoHang
        SET cttp.soLuong = cttp.soLuong - ctpx.soLuong
        WHERE ctpx.maPhieuXuat = NEW.maPhieuXuat;
	END IF;
END;
//
DELIMITER ;
