export default [
    {
        icon: "mdi-home",
        title: "Trang chủ",
        to: "/"
    },
    {
        icon: "mdi-city",
        title: "Khai Báo Đơn vị",
        to: "/don-vi/don-vi"
    },
    {
        icon: "mdi-account-group-outline",
        title: "Tác nhân",
        children: [
            {
                icon: "mdi-account-multiple",
                title: "Khai Báo Tác Nhân",
                to: "/tac-nhan/tac-nhan"
            },
            {
                icon: "mdi-adjust",
                title: "Chức năng phần mềm",
                to: "/tac-nhan/tac-nhan_chuc-nang-phan-mem"
            }
        ]
    },
    {
        icon: "mdi-account-box-multiple",
        title: "Khai Báo Người dùng",
        to: "/user/User"
    },
    {
        icon: "mdi-map-marker",
        title: "Quy Chuẩn",
        children: [
            {
                icon: "mdi-map-marker",
                title: "Tỉnh",
                to: "/quy-chuan/tinh"
            },
            {
                icon: "mdi-map-marker",
                title: "Huyện",
                to: "/quy-chuan/huyen"
            },
            {
                icon: "mdi-map-marker",
                title: "Xã",
                to: "/quy-chuan/xa"
            }
        ]
    },
    {
        icon: "mdi-timer",
        title: "Khai Báo Kỳ Báo Cáo",
        to: "/bao-cao/ky-bao-cao"
    },
    {
        icon: "mdi-format-list-bulleted",
        title: "Khai Báo Chỉ tiêu KTXH",
        to: "/chi-tieu/chi-tieu"
    },
    {
        icon: "mdi-group",
        title: "Khai Báo Chỉ Tiêu Nhóm",
        to: "/chi-tieu/chi-tieu-nhom"
    },
    {
        icon: "mdi-group",
        title: "Khai Báo Chỉ Tiêu Phân Tổ",
        to: "/chi-tieu/chi-tieu_phan-to"
    },
    {
        icon: "mdi-select-group",
        title: "Khai Báo Phân Tổ",
        to: "/phan-to/phan-to"
    },
    {
        icon: "mdi-playlist-edit",
        title: "Phân Tổ Chi Tiết",
        to: "/phan-to/phan-to-chi-tiet"
    },
    {
        icon: "mdi-file-document-box-multiple-outline",
        title: "Biểu Nhập Liệu",
        children: [
            {
                icon: "mdi-file-document-box",
                title: "Biểu Nhập Liệu Chi Tiêu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_chi-tieu"
            },
            {
                icon: "mdi-file-chart",
                title: "Biểu Nhập Liệu Kỳ Báo Cáo",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_ky-bao-cao"
            },
            {
                icon: "mdi-clipboard-list-outline",
                title: "Biểu Nhập Liệu Trường Dữ Liệu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_truong-du-lieu"
            }
        ]
    }
]