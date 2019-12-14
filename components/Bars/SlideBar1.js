export default [
    {
        icon: "mdi-home",
        title: "Trang chủ",
        to: "/"
    },
    {
        icon: "mdi-account-group-outline",
        title: "Quản Trị",
        children: [
            {
                icon: "mdi-city",
                title: "Khai Báo Đơn vị",
                to: "/quan-tri/don-vi"
            },
            {
                icon: "mdi-account-multiple",
                title: "Khai Báo Tác Nhân",
                to: "/quan-tri/tac-nhan"
            },
            {
                icon: "mdi-account-box-multiple",
                title: "Khai Báo Người dùng",
                to: "/quan-tri/User"
            }
        ]
    },
    {
        icon: "mdi-map-marker-multiple",
        title: "Quy Chuẩn",
        children: [
            {
                icon: "mdi-map-marker",
                title: "Tỉnh",
                to: "/quy-chuan/tinh"
            },
            {
                icon: "mdi-map-marker-circle",
                title: "Huyện",
                to: "/quy-chuan/huyen"
            },
            {
                icon: "mdi-map-marker-radius",
                title: "Xã",
                to: "/quy-chuan/xa"
            }
        ]
    },
    {
        icon: "mdi-group",
        title: "Chỉ Tiêu",
        children: [
            {
                icon: "mdi-nature",
                title: "Chỉ Tiêu",
                to: "/chi-tieu/chi-tieu"
            },
            {
                icon: "mdi-bulletin-board",
                title: "Chỉ Tiêu Nhóm",
                to: "/chi-tieu/chi-tieu-nhom"
            },
            {
                icon: "mdi-layers",
                title: "Chỉ Tiêu Phân Tổ",
                to: "/chi-tieu/chi-tieu-phan-to"
            },
            {
                icon: "mdi-library-books",
                title: "Chỉ Tiêu Phân Tổ Chi Tiết",
                to: "/chi-tieu/chi-tieu-phan-to-chi-tiet"
            },
        ]
    },
    {   
        icon: "mdi-chart-histogram",
        title: "Quản lý",
        children: [ 
            {
            icon: "mdi-timer",
            title: "Khai Báo Kỳ Báo Cáo",
            to: "/bao-cao/ky-bao-cao"
            }
            ,
            {
            icon: "mdi-calendar-text",
            title: "Năm Báo Cáo",
            to: "/bao-cao/nam-bao-cao"
            }
        ]
    },
    {
        icon: "mdi-file-document-box-multiple-outline",
        title: "Biểu Nhập Liệu",
        children: [
            {
                icon: "mdi-file-document-box",
                title: "Chi Tiêu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_chi-tieu"
            },
            {
                icon: "mdi-file-chart",
                title: "Kỳ Báo Cáo",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_ky-bao-cao"
            },
            {
                icon: "mdi-clipboard-list-outline",
                title: "Trường Nhập Liệu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_truong-nhap-lieu"
            }
        ]
    }
]