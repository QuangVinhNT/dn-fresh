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
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: DIACHI
CREATE TABLE DIACHI (
    maDiaChi VARCHAR(255) PRIMARY KEY,
    chiTietDiaChi VARCHAR(255),
    maPhuongXa VARCHAR(10),
    FOREIGN KEY (maPhuongXa) REFERENCES PHUONGXA(maPhuongXa)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: VAITRONGUOIDUNG
CREATE TABLE VAITRONGUOIDUNG (
    maNguoiDung VARCHAR(10),
    maVaiTro VARCHAR(5),
    PRIMARY KEY (maNguoiDung, maVaiTro),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maVaiTro) REFERENCES VAITRO(maVaiTro)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: ANHTHUCPHAM
CREATE TABLE ANHTHUCPHAM (
    maAnh VARCHAR(255) PRIMARY KEY,
    maThucPham VARCHAR(10),
    hinhAnh TEXT,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maNhaCungCap) REFERENCES NHACUNGCAP(maNhaCungCap)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: CHITIETTHUCPHAMNHAP
CREATE TABLE CHITIETTHUCPHAMNHAP (
    maLoHang VARCHAR(255) PRIMARY KEY,
    maPhieuNhap VARCHAR(255),
    maThucPham VARCHAR(10),
    ngaySanXuat DATETIME,
    hanSuDung DATETIME,
    donGiaNhap DECIMAL(10, 2),
    soLuong SMALLINT,
    FOREIGN KEY (maPhieuNhap) REFERENCES PHIEUNHAP(maPhieuNhap)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: CHITIETPHIEUXUAT
CREATE TABLE CHITIETPHIEUXUAT (
    maPhieuXuat VARCHAR(255),
    maThucPham VARCHAR(10),
    maLoHang VARCHAR(255),
    soLuong SMALLINT,
    PRIMARY KEY (maPhieuXuat, maLoHang, maThucPham),
    FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (maLoHang) REFERENCES CHITIETTHUCPHAMNHAP(maLoHang)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    giaTriDonHang INT,
    FOREIGN KEY (maKhachHang) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maDiaChi) REFERENCES DIACHI(maDiaChi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maPhieuXuat) REFERENCES PHIEUXUAT(maPhieuXuat)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: CHITIETDONHANG
CREATE TABLE CHITIETDONHANG (
    maDonHang VARCHAR(255),
    maThucPham VARCHAR(10),
    soLuong SMALLINT,
    PRIMARY KEY (maDonHang, maThucPham),
    FOREIGN KEY (maDonHang) REFERENCES DONHANG(maDonHang)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: THUCPHAMYEUTHICH
CREATE TABLE THUCPHAMYEUTHICH (
    maNguoiDung VARCHAR(10),
    maThucPham VARCHAR(10),
    ngayTao DATETIME,
    PRIMARY KEY (maNguoiDung, maThucPham),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    FOREIGN KEY (maNhanVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maQuanTriVien) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maCaLam) REFERENCES CALAMVIEC(maCaLam)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: GIOHANG
CREATE TABLE GIOHANG (
    maNguoiDung VARCHAR(10),
    maThucPham VARCHAR(10),
    soLuong SMALLINT,
    ngayTao DATETIME,
    PRIMARY KEY (maNguoiDung, maThucPham),
    FOREIGN KEY (maNguoiDung) REFERENCES NGUOIDUNG(maNguoiDung)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (maThucPham) REFERENCES KHOTHUCPHAM(maThucPham)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert sample data for TINHTHANHPHO
INSERT INTO TINHTHANHPHO (maTinhThanhPho, tenTinhThanhPho) VALUES
('01', 'Hà Nội'),
('02', 'Thành phố Hồ Chí Minh'),
('03', 'Thành phố Hải Phòng'),
('04', 'Thành phố Đà Nẵng'),
('05', 'Thành phố Cần Thơ'),
('06', 'Thành phố Huế'),
('07', 'Lai Châu'),
('08', 'Điện Biên'),
('09', 'Sơn La'),
('10', 'Lạng Sơn'),
('11', 'Quảng Ninh'),
('12', 'Thanh Hóa'),
('13', 'Nghệ An'),
('14', 'Hà Tĩnh'),
('15', 'Cao Bằng'),
('16', 'Tuyên Quang'),     
('17', 'Lào Cai'),         
('18', 'Thái Nguyên'),     
('19', 'Phú Thọ'),         
('20', 'Bắc Ninh'),        
('21', 'Hưng Yên'),        
('22', 'Ninh Bình'),       
('23', 'Quảng Trị'),       
('24', 'Quảng Ngãi'),      
('25', 'Gia Lai'),         
('26', 'Khánh Hòa'),       
('27', 'Lâm Đồng'),        
('28', 'Đắk Lắk'),         
('29', 'Đồng Nai'),        
('30', 'Tây Ninh'),        
('31', 'Vĩnh Long'),       
('32', 'Đồng Tháp'),       
('33', 'Cà Mau'),          
('34', 'An Giang');        

-- Insert sample data for PHUONGXA
INSERT INTO PHUONGXA (maPhuongXa, tenPhuongXa, maTinhThanhPho) VALUES
('HN_001', 'Hoàn Kiếm', '01'),
('HN_002', 'Cửa Nam', '01'),
('HN_003', 'Hồng Hà', '01'),
('HN_004', 'Văn Miếu - Quốc Tử Giám', '01'),
('HN_005', 'Phương Liên - Trung Tự', '01'),
('HN_006', 'Khâm Thiên', '01'),
('HN_007', 'Khương Thượng', '01'),
('HN_008', 'Thịnh Quang', '01'),
('HN_009', 'Trúc Bạch', '01'),
('HN_010', 'Việt Hưng', '01'),
('HCM_001', 'Sài Gòn', '02'),
('HCM_002', 'Chợ Lớn', '02'),
('HCM_003', 'Gia Định', '02'),
('HCM_004', 'Hiệp Bình', '02'),
('HCM_005', 'Tam Bình', '02'),
('HCM_006', 'Thủ Đức', '02'),
('HCM_007', 'Linh Xuân', '02'),
('HCM_008', 'Long Bình', '02'),
('HCM_009', 'Tăng Nhơn Phú', '02'),
('HCM_010', 'Phước Long', '02'),
('HP_001', 'Cát Bi', '03'),
('HP_002', 'Hồng Bàng', '03'),
('HP_003', 'Lê Chân', '03'),
('HP_004', 'Ngô Quyền', '03'),
('HP_005', 'Kiến An', '03'),
('HP_006', 'Đồ Sơn', '03'),
('HP_007', 'An Dương', '03'),
('HP_008', 'Thủy Nguyên', '03'),
('HP_009', 'Tiên Lãng', '03'),
('HP_010', 'Vĩnh Bảo', '03'),
('DN_001', 'Hải Châu', '04'),
('DN_002', 'Hòa Cường', '04'),
('DN_003', 'Thanh Khê', '04'),
('DN_004', 'An Khê', '04'),
('DN_005', 'An Hải', '04'),
('DN_006', 'Sơn Trà', '04'),
('DN_007', 'Ngũ Hành Sơn', '04'),
('DN_008', 'Hòa Khánh', '04'),
('DN_009', 'Hải Vân', '04'),
('DN_010', 'Liên Chiểu', '04'),
('DN_011', 'Cẩm Lệ', '04'),
('DN_012', 'Hòa Xuân', '04'),
('DN_013', 'Hòa Vang', '04'),
('DN_014', 'Hòa Tiến', '04'),
('DN_015', 'Bà Nà', '04'),
('DN_016', 'Hoàng Sa', '04'),
('DN_017', 'Tam Hải', '04'),
('DN_018', 'Tân Hiệp', '04'),
('DN_019', 'Phước Thành', '04'),
('DN_020', 'Phước Hiệp', '04'),
('DN_021', 'Tam Kỳ', '04'),
('DN_022', 'Quảng Phú', '04'),
('DN_023', 'Hương Trà', '04'),
('DN_024', 'Bàn Thạch', '04'),
('DN_025', 'Hội An', '04'),
('DN_026', 'Hội An Đông', '04'),
('DN_027', 'Hội An Tây', '04'),
('CT_001', 'Cái Khế', '05'),
('CT_002', 'An Nghiệp', '05'),
('CT_003', 'Hưng Phú', '05'),
('CT_004', 'Tân Lộc', '05'),
('CT_005', 'Trường Long', '05'),
('CT_006', 'Thạnh Phú', '05'),
('CT_007', 'Thới Hưng', '05'),
('CT_008', 'Phong Nẫm', '05'),
('CT_009', 'Mỹ Phước', '05'),
('CT_010', 'Lai Hòa', '05'),
('HU_001', 'Phú Hậu', '06'),
('HU_002', 'Vỹ Dạ', '06'),
('HU_003', 'Hương Sơ', '06'),
('HU_004', 'Phú Nhuận', '06'),
('HU_005', 'Thủy Xuân', '06'),
('HU_006', 'Hương Long', '06'),
('HU_007', 'An Đông', '06'),
('HU_008', 'Phong Điền', '06'),
('HU_009', 'Hương Thọ', '06'),
('HU_010', 'Thuận An', '06'),
('LCH_001', 'Đoàn Kết', '07'),
('LCH_002', 'Tân Phong', '07'),
('LCH_003', 'Quyết Thắng', '07'),
('LCH_004', 'Tam Đường', '07'),
('LCH_005', 'Mường Tè', '07'),
('LCH_006', 'Nậm Nhùn', '07'),
('LCH_007', 'Sìn Hồ', '07'),
('LCH_008', 'Phong Thổ', '07'),
('LCH_009', 'Than Uyên', '07'),
('LCH_010', 'Nậm Hàng', '07'),
('DB_001', 'Him Lam', '08'),
('DB_002', 'Thanh Bình', '08'),
('DB_003', 'Mường Thanh', '08'),
('DB_004', 'Noong Bua', '08'),
('DB_005', 'Tủa Chùa', '08'),
('DB_006', 'Mường Ảng', '08'),
('DB_007', 'Điện Biên Phủ', '08'),
('DB_008', 'Mường Lay', '08'),
('DB_009', 'Nà Tấu', '08'),
('DB_010', 'Pá Khoang', '08'),
('SL_001', 'Chiềng Lề', '09'),
('SL_002', 'Tô Hiệu', '09'),
('SL_003', 'Quyết Tâm', '09'),
('SL_004', 'Mường La', '09'),
('SL_005', 'Thuận Châu', '09'),
('SL_006', 'Mộc Châu', '09'),
('SL_007', 'Yên Châu', '09'),
('SL_008', 'Mai Sơn', '09'),
('SL_009', 'Sông Mã', '09'),
('SL_010', 'Bắc Yên', '09'),
('LS_001', 'Hoàng Văn Thụ', '10'),
('LS_002', 'Tam Thanh', '10'),
('LS_003', 'Vĩnh Trại', '10'),
('LS_004', 'Chi Lăng', '10'),
('LS_005', 'Đồng Mỏ', '10'),
('LS_006', 'Tràng Định', '10'),
('LS_007', 'Văn Lãng', '10'),
('LS_008', 'Cao Lộc', '10'),
('LS_009', 'Bình Gia', '10'),
('LS_010', 'Hữu Lũng', '10'),
('QN_001', 'Hà Khẩu', '11'),
('QN_002', 'Yên Thanh', '11'),
('QN_003', 'Cẩm Phả', '11'),
('QN_004', 'Hạ Long', '11'),
('QN_005', 'Móng Cái', '11'),
('QN_006', 'Đông Triều', '11'),
('QN_007', 'Uông Bí', '11'),
('QN_008', 'Quảng Yên', '11'),
('QN_009', 'Cô Tô', '11'),
('QN_010', 'Bình Liêu', '11'),
('TH_001', 'Phú Xuân', '12'),
('TH_002', 'Mường Chanh', '12'),
('TH_003', 'Quang Chiểu', '12'),
('TH_004', 'Tam Chung', '12'),
('TH_005', 'Pù Nhi', '12'),
('TH_006', 'Nhi Sơn', '12'),
('TH_007', 'Mường Lý', '12'),
('TH_008', 'Na Mèo', '12'),
('TH_009', 'Sơn Thủy', '12'),
('TH_010', 'Sơn Điện', '12'),
('NA_001', 'Cửa Nam', '13'),
('NA_002', 'Hưng Bình', '13'),
('NA_003', 'Quán Hành', '13'),
('NA_004', 'Nghi Phú', '13'),
('NA_005', 'Vinh Tân', '13'),
('NA_006', 'Cửa Lò', '13'),
('NA_007', 'Diễn Châu', '13'),
('NA_008', 'Quỳnh Lưu', '13'),
('NA_009', 'Con Cuông', '13'),
('NA_010', 'Tương Dương', '13'),
('HT_001', 'Bắc Hà', '14'),
('HT_002', 'Trần Phú', '14'),
('HT_003', 'Thạch Hà', '14'),
('HT_004', 'Cẩm Xuyên', '14'),
('HT_005', 'Kỳ Anh', '14'),
('HT_006', 'Hồng Lĩnh', '14'),
('HT_007', 'Đức Thọ', '14'),
('HT_008', 'Vũ Quang', '14'),
('HT_009', 'Can Lộc', '14'),
('HT_010', 'Hương Sơn', '14'),
('CB_001', 'Hòa Chung', '15'),
('CB_002', 'Sông Hiến', '15'),
('CB_003', 'Ngọc Xuân', '15'),
('CB_004', 'Trà Lĩnh', '15'),
('CB_005', 'Bảo Lâm', '15'),
('CB_006', 'Hà Quảng', '15'),
('CB_007', 'Thông Nông', '15'),
('CB_008', 'Nguyên Bình', '15'),
('CB_009', 'Phục Hòa', '15'),
('CB_010', 'Thạch An', '15'),
('TQ_001', 'Trung Hà', '16'),
('TQ_002', 'Kiến Thiết', '16'),
('TQ_003', 'Hùng Đức', '16'),
('TQ_004', 'Minh Sơn', '16'),
('TQ_005', 'Minh Tân', '16'),
('TQ_006', 'Thuận Hòa', '16'),
('TQ_007', 'Tùng Bá', '16'),
('TQ_008', 'Thượng Sơn', '16'),
('TQ_009', 'Cao Bồ', '16'),
('TQ_010', 'Ngọc Long', '16'),
('LC_001', 'Phố Mới', '17'),
('LC_002', 'Cốc Lếu', '17'),
('LC_003', 'Bắc Cường', '17'),
('LC_004', 'Sa Pa', '17'),
('LC_005', 'Bát Xát', '17'),
('LC_006', 'Mường Khương', '17'),
('LC_007', 'Si Ma Cai', '17'),
('LC_008', 'Bảo Thắng', '17'),
('LC_009', 'Văn Bàn', '17'),
('LC_010', 'Bắc Hà', '17'),
('TNG_001', 'Trưng Vương', '18'),
('TNG_002', 'Hoàng Văn Thụ', '18'),
('TNG_003', 'Phan Đình Phùng', '18'),
('TNG_004', 'Đồng Quang', '18'),
('TNG_005', 'Sông Công', '18'),
('TNG_006', 'Phú Xá', '18'),
('TNG_007', 'Định Hóa', '18'),
('TNG_008', 'Đồng Hỷ', '18'),
('TNG_009', 'Võ Nhai', '18'),
('TNG_010', 'Phổ Yên', '18'),
('PT_001', 'Gia Cẩm', '19'),
('PT_002', 'Nông Trang', '19'),
('PT_003', 'Tân Dân', '19'),
('PT_004', 'Thanh Miếu', '19'),
('PT_005', 'Tam Nông', '19'),
('PT_006', 'Lâm Thao', '19'),
('PT_007', 'Thanh Thủy', '19'),
('PT_008', 'Cẩm Khê', '19'),
('PT_009', 'Yên Lập', '19'),
('PT_010', 'Hạ Hòa', '19'),
('BN_001', 'Vũ Ninh', '20'),
('BN_002', 'Đáp Cầu', '20'),
('BN_003', 'Suối Hoa', '20'),
('BN_004', 'Tương Giang', '20'),
('BN_005', 'Quế Võ', '20'),
('BN_006', 'Yên Phong', '20'),
('BN_007', 'Từ Sơn', '20'),
('BN_008', 'Tiên Du', '20'),
('BN_009', 'Gia Bình', '20'),
('BN_010', 'Lương Tài', '20'),
('HY_001', 'Lam Sơn', '21'),
('HY_002', 'Hiến Nam', '21'),
('HY_003', 'An Tảo', '21'),
('HY_004', 'Phú Cường', '21'),
('HY_005', 'Kiều Phú', '21'),
('HY_006', 'Hưng Đạo', '21'),
('HY_007', 'Văn Giang', '21'),
('HY_008', 'Khoái Châu', '21'),
('HY_009', 'Ân Thi', '21'),
('HY_010', 'Mỹ Hào', '21'),
('NB_001', 'Thanh Bình', '22'),
('NB_002', 'Bích Đào', '22'),
('NB_003', 'Phúc Thành', '22'),
('NB_004', 'Ninh Phong', '22'),
('NB_005', 'Tam Điệp', '22'),
('NB_006', 'Nho Quan', '22'),
('NB_007', 'Gia Viễn', '22'),
('NB_008', 'Hoa Lư', '22'),
('NB_009', 'Yên Khánh', '22'),
('NB_010', 'Kim Sơn', '22'),
('QT_001', 'Đông Hà', '23'),
('QT_002', 'Hải Lệ', '23'),
('QT_003', 'Triệu Phong', '23'),
('QT_004', 'Gio Linh', '23'),
('QT_005', 'Vĩnh Linh', '23'),
('QT_006', 'Cam Lộ', '23'),
('QT_007', 'Đakrông', '23'),
('QT_008', 'Hướng Hóa', '23'),
('QT_009', 'Hải Lăng', '23'),
('QT_010', 'Cồn Cỏ', '23'),
('QNG_001', 'Lê Hồng Phong', '24'),
('QNG_002', 'Trần Phú', '24'),
('QNG_003', 'Nghĩa Chánh', '24'),
('QNG_004', 'Dung Quất', '24'),
('QNG_005', 'Bình Sơn', '24'),
('QNG_006', 'Sơn Tịnh', '24'),
('QNG_007', 'Tư Nghĩa', '24'),
('QNG_008', 'Mộ Đức', '24'),
('QNG_009', 'Đức Phổ', '24'),
('QNG_010', 'Lý Sơn', '24'),
('GL_001', 'Tây Sơn', '25'),
('GL_002', 'Hội Thương', '25'),
('GL_003', 'Chi Lăng', '25'),
('GL_004', 'An Khê', '25'),
('GL_005', 'Kbang', '25'),
('GL_006', 'Chư Sê', '25'),
('GL_007', 'Chư Prông', '25'),
('GL_008', 'Ia Kha', '25'),
('GL_009', 'Đắk Đoa', '25'),
('GL_010', 'Mang Yang', '25'),
('KH_001', 'Lộc Thọ', '26'),
('KH_002', 'Phước Hải', '26'),
('KH_003', 'Vĩnh Nguyên', '26'),
('KH_004', 'Cam Nghĩa', '26'),
('KH_005', 'Ninh Hòa', '26'),
('KH_006', 'Vạn Ninh', '26'),
('KH_007', 'Diên Khánh', '26'),
('KH_008', 'Cam Lâm', '26'),
('KH_009', 'Khánh Vĩnh', '26'),
('KH_010', 'Trường Sa', '26'),
('LD_001', 'Quảng Hòa', '27'),
('LD_002', 'Quảng Sơn', '27'),
('LD_003', 'Quảng Trực', '27'),
('LD_004', 'Ninh Gia', '27'),
('LD_005', 'Lộc Phát', '27'),
('LD_006', 'Đà Lạt', '27'),
('LD_007', 'Bảo Lộc', '27'),
('LD_008', 'Đơn Dương', '27'),
('LD_009', 'Đức Trọng', '27'),
('LD_010', 'Di Linh', '27'),
('DL_001', 'Ea H’Leo', '28'),
('DL_002', 'Ea Trang', '28'),
('DL_003', 'Ia Lốp', '28'),
('DL_004', 'Ia Rvê', '28'),
('DL_005', 'Krông Nô', '28'),
('DL_006', 'Vụ Bổn', '28'),
('DL_007', 'Tân Hòa', '28'),
('DL_008', 'Buôn Đôn', '28'),
('DL_009', 'Cư M’gar', '28'),
('DL_010', 'Krông Búk', '28'),
('DGN_001', 'Tân Phong', '29'),
('DGN_002', 'Hòa Bình', '29'),
('DGN_003', 'Long Thành', '29'),
('DGN_004', 'Biên Hòa', '29'),
('DGN_005', 'Trảng Bom', '29'),
('DGN_006', 'Nhơn Trạch', '29'),
('DGN_007', 'Vĩnh Cửu', '29'),
('DGN_008', 'Định Quán', '29'),
('DGN_009', 'Tân Phú', '29'),
('DGN_010', 'Thống Nhất', '29'),
('TN_001', 'Hiệp Ninh', '30'),
('TN_002', 'Tân Bình', '30'),
('TN_003', 'Châu Thành', '30'),
('TN_004', 'Dương Minh Châu', '30'),
('TN_005', 'Gò Dầu', '30'),
('TN_006', 'Trảng Bàng', '30'),
('TN_007', 'Hòa Thành', '30'),
('TN_008', 'Bến Cầu', '30'),
('TN_009', 'Tân Châu', '30'),
('TN_010', 'Mỏ Công', '30'),
('VL_001', 'Long Hòa', '31'),
('VL_002', 'Đông Hải', '31'),
('VL_003', 'Long Vĩnh', '31'),
('VL_004', 'Hòa Minh', '31'),
('VL_005', 'Tân Ngãi', '31'),
('VL_006', 'Vũng Liêm', '31'),
('VL_007', 'Mang Thít', '31'),
('VL_008', 'Bình Minh', '31'),
('VL_009', 'Tam Bình', '31'),
('VL_010', 'Trà Ôn', '31'),
('DT_001', 'Mỹ Thọ', '32'),
('DT_002', 'Hòa An', '32'),
('DT_003', 'Cao Lãnh', '32'),
('DT_004', 'Sa Đéc', '32'),
('DT_005', 'Hồng Ngự', '32'),
('DT_006', 'Tân Hồng', '32'),
('DT_007', 'Tháp Mười', '32'),
('DT_008', 'Tam Nông', '32'),
('DT_009', 'Thanh Bình', '32'),
('DT_010', 'Lấp Vò', '32'),
('CM_001', 'Tân Thành', '33'),
('CM_002', 'Phường 5', '33'),
('CM_003', 'Hòa Thành', '33'),
('CM_004', 'Tắc Vân', '33'),
('CM_005', 'Cái Nước', '33'),
('CM_006', 'Thới Bình', '33'),
('CM_007', 'U Minh', '33'),
('CM_008', 'Trần Văn Thời', '33'),
('CM_009', 'Đầm Dơi', '33'),
('CM_010', 'Ngọc Hiển', '33'),
('AG_001', 'Mỹ Hòa Hưng', '34'),
('AG_002', 'Bình Giang', '34'),
('AG_003', 'Bình Sơn', '34'),
('AG_004', 'Hòn Nghệ', '34'),
('AG_005', 'Sơn Hải', '34'),
('AG_006', 'Tiên Hải', '34'),
('AG_007', 'Châu Đốc', '34'),
('AG_008', 'Long Xuyên', '34'),
('AG_009', 'Tân Châu', '34'),
('AG_010', 'An Phú', '34');

-- Insert sample data for DIACHI
INSERT INTO DIACHI (maDiaChi, chiTietDiaChi, maPhuongXa) VALUES
('DC001', 'Thôn Mỹ Sơn', 'DN_015');

-- Insert sample data for VAITRO
INSERT INTO VAITRO (maVaiTro, tenVaiTro, moTa) VALUES
('VT001', 'Quản trị viên', 'Quản lý hệ thống'),
('VT002', 'Nhân viên kho', 'Nhân viên kho'),
('VT003', 'Nhân viên giao hàng', 'Nhân viên giao hàng'),
('VT004', 'Khách hàng', 'Người mua hàng');

-- Insert sample data for NGUOIDUNG (admin password default: Dnfresh123@)
INSERT INTO NGUOIDUNG (maNguoiDung, hoTen, gioiTinh, ngaySinh, soDienThoai, maDiaChi, email, matKhau, hinhAnh, ngayTao, ngayCapNhat, trangThai) VALUES
('ND001', 'Administrator', 1, '2003-11-25', '0978265138', 'DC001', 'admin@gmail.com', '$2a$12$Tn9bhXWnryJzATgNj9clb.jcFigIypqs0dmY2H6DVuvTKuYrlchrm', NULL, NOW(), NOW(), 1);

-- Insert sample data for VAITRONGUOIDUNG
INSERT INTO VAITRONGUOIDUNG (maNguoiDung, maVaiTro) VALUES
('ND001', 'VT001'),
('ND001', 'VT004');

-- Insert sample data for DANHMUC
INSERT INTO DANHMUC (maDanhMuc, tenDanhMuc, moTa, trangThai, ngayTao, ngayCapNhat) VALUES
('DM001', 'Rau củ', 'Các loại rau củ tươi', 1, NOW(), NOW()),
('DM002', 'Thịt', 'Các loại thịt tươi', 1, NOW(), NOW()),
('DM003', 'Thủy - hải sản', 'Các loại thủy hải sản tươi', 1, NOW(), NOW()),
('DM004', 'Trứng', 'Các loại trứng và sản phẩm từ trứng', 1, NOW(), NOW()),
('DM005', 'Gia vị', 'Các loại gia vị thực vật', 1, NOW(), NOW()),
('DM006', 'Trái cây', 'Các loại trái cây', 1, NOW(), NOW());

-- Insert sample data for CALAMVIEC
INSERT INTO CALAMVIEC (maCaLam, thoiGianBatDau, thoiGianKetThuc) VALUES
('CL001', '08:00:00', '12:00:00'),
('CL002', '13:00:00', '17:00:00'),
('CL003', '18:00:00', '22:00:00');


-- Trigger

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongTonKho_phieunhap_update
AFTER UPDATE ON phieunhap
FOR EACH ROW
BEGIN
	IF OLD.trangThai <> 1 AND NEW.trangThai = 1 THEN
		UPDATE khothucpham AS tp
        JOIN chitietthucphamnhap AS cttp ON cttp.maThucPham = tp.maThucPham
        SET tp.soLuongTonKho = tp.soLuongTonKho + cttp.soLuong
        WHERE cttp.maPhieuNhap = NEW.maPhieuNhap;

        UPDATE khothucpham
        SET trangthai = 1
        WHERE soLuongTonKho - soLuongChoXuat > 0;
	END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongTonKho_phieuxuat_update
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

        UPDATE khothucpham
        SET trangThai = 2
        WHERE soLuongTonKho - soLuongChoXuat = 0;
	END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongChoXuat_chitietdonhang_insert
AFTER INSERT ON chitietdonhang
FOR EACH ROW
BEGIN
	UPDATE khothucpham AS tp
    SET tp.soLuongChoXuat = tp.soLuongChoXuat + NEW.soLuong
    WHERE tp.maThucPham = NEW.maThucPham;

    UPDATE khothucpham
    SET trangThai = 2
    WHERE soLuongTonKho - soLuongChoXuat = 0;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_CapNhatSoLuongHangKhiHuy_donhang_update
AFTER UPDATE ON donhang
FOR EACH ROW
BEGIN
	IF OLD.trangThai <> 0 AND NEW.trangThai = 0 THEN
        IF NEW.maPhieuXuat IS NOT NULL THEN
            UPDATE khothucpham AS tp
            JOIN chitietdonhang AS ctdh ON ctdh.maThucPham = tp.maThucPham
            SET tp.soLuongTonKho = tp.soLuongTonKho + ctdh.soLuong
            WHERE ctdh.maDonHang = NEW.maDonHang;
            
            UPDATE chitietthucphamnhap AS cttp
            JOIN chitietphieuxuat AS ctpx ON ctpx.maLoHang = cttp.maLoHang
            JOIN chitietdonhang AS ctdh ON ctdh.maThucPham = ctpx.maThucPham
            SET cttp.soLuong = cttp.soLuong + ctdh.soLuong
            WHERE ctdh.maDonHang = NEW.maDonHang AND ctpx.maPhieuXuat = NEW.maPhieuXuat;
		ELSE
			UPDATE khothucpham AS tp
            JOIN chitietdonhang AS ctdh ON ctdh.maThucPham = tp.maThucPham
            SET tp.soLuongChoXuat = tp.soLuongChoXuat - ctdh.soLuong
            WHERE ctdh.maDonHang = NEW.maDonHang;
		END IF;
	END IF;
END;
//
DELIMITER ;
