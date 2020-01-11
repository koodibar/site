---
layout: post
current: post
title: "Flutter tạp lục" 
date: 2020-01-11 15:00
navigation: true
categories: [flutter, mobile, react-native]
author: hungneox
tags : [flutter, dart, mobile]
description: "Giới thiệu về flutter và đôi điều cho react native developers"
cover: assets/posts/flutter-intro/cover.jpg
subclass: 'post tag-getting-started'
class: post-template
comments: true
toc: true
---

# Tổng quan về flutter

> “Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.” - Google, flutter.dev

[Flutter](https://flutter.dev/) là một cross-platform UI framework của Google, dựa trên 2D graphic engine [Skia](https://skia.org/) và sử dụng ngôn ngữ Dart. Nó được google quảng cáo mạnh [I/O 2017](https://events.google.com/io2017/).

Về mặt tổng quát thì flutter cũng tương tự như React đều sử dụng reactive-style views. Tuy nhiên thay vì được transpiled thành naitive widget thì flutter dùng engine Skia để vẽ lại, ngoài ra thì dart có thể được biên dịch thẳng thành native code nên tăng được performance nhờ bỏ đi một tầng cầu nối trung gian giữa JavaScript và native OS code (bridge). [<sup>1</sup>](https://flutter.dev/docs/get-started/flutter-for/react-native-devs]).

!["Navigation iOS back"](/assets/posts/flutter-intro/navigation-ios-back.gif)

Triết lý của flutter là giữ mọi default behavior của platform ([platform adaptation](https://flutter.dev/docs/resources/platform-adaptations)). Tuỳ từng OS, mà mặc định flutter sẽ giữ nguyên các behavior, transition, typography, gestures đúng với nguyên gốc. Điều này mang lại cảm giác "native" cho ứng dụng mặc dù flutter không dùng OEM widgets.



!["Dart"](/assets/posts/flutter-intro/platform.png)

Hiện tại dù flutter chủ yếu được dùng để phát triển ứng dụng di động nhưng flutter vẫn support môi trường [web](https://flutter.dev/web) và [desktop](https://flutter.dev/desktop).

# Ngôn ngữ Dart

!["Dart"](/assets/posts/flutter-intro/dart-demo.gif)

Dart là một ngôn ngữ lập trình không mới, nói một cách nào đó nó là một thất bại của Google trong nỗ lực nhằm thay thế vị trí của JavaScript trên trình duyệt.

Dart được giới thiệu lần đầu tiên ở GOTO conference tại Aarhus, Đan Mạch vào 10/12/2011. Ngôn ngữ này có syntax giống như C và có một bộ dọn rác (a.k.a garbage collector). Dart khá giống Java hay Typescript, nó có *strong type system* (dịch sang tiếng Việt là "*Hệ thống Kiểu mạnh*"). Điểm ưu việt hơn so với JavaScript là Dart có thể được biên dịch (compile) ra thẳng mã máy ([Ahead-of-time compilation](https://www.wikiwand.com/en/Ahead-of-time_compilation)) đồng thời cũng có thể biên dịch tức thời ([JIT compilation](https://www.wikiwand.com/en/Just-in-time_compilation)) chạy trên Dart VM ([xem thêm](https://mrale.ph/dartvm/)). Cho nên nó vừa thuận tiện cho việc phát triển ứng dụng cũng như mang lại performance cao cho production app.

# Thinking in widgets

!["Flutter widgets"](/assets/posts/flutter-intro/widgets.jpg)

Thế giới flutter xoay quanh widgets, gần như mọi thứ trong flutter đều là widgets, thậm chí `Visibility`, `Padding`, `GestureDetector` trong flutter cũng là widgets. Có hai loại widgets chính là `Stateful Widgets` và `Stateless Widgets`:
- Stateless Widget: Immutable views, chỉ được built một lần.
- Stateful Widget:  Vẫn là immutable những được redraw sau khi `setState(()=>{})` được gọi.

Flutter được ship với một set các widgets dựa trên thiết kế [Material](https://flutter.dev/docs/development/ui/widgets/material) của Google và [Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino) của Apple. Mặc dù vậy, nó không tự thay đổi tuỳ theo target OS, một khi bạn chọn build app theo kiểu material design thì nó cũng có material design look-and-feel trên ios. Nhưng chúng ta vẫn có thể giải quyết vấn đề này bằng cách dùng thư viện ngoài như [Platform Aware Widgets](https://pub.dev/packages/flutter_platform_widgets).

# Last but not least: Tại sao là flutter?

+ **Dễ học và sử dụng**: Flutter là một framework hiện đại, nó giúp phát triển ứng dụng (cụ thể là mobile app) một cách dễ dàng và nhanh chóng so với code app native bằng Java/Swift (hay thậm chí là so với react native).
+ **Biên dịch nhanh**: Flutter cho phép hot-reload code, nó giúp giảm thiểu tối đa thời gian phát triển phần mềm. Ví dụ khi cần thay đổi kích thước của một element thì nó thay đổi real-time. Tuy nhiên với một số thay đổi lớn trong code thì flutter thực sự cần được reload lại toàn bộ.
- **Lý tưởng cho startups và làm MVP**: 
Nếu bạn là khởi nghiệp gia và muốn ra được sản phẩm càng nhanh càng tốt thì flutter là một ứng cử viên tốt. Ở đây dùng từ ứng cử viên thì react-native cũng là một lựa chọn. Vì các yếu tố sau:
    - Rẻ: thay vì để duy trì hai app một cho android và một cho ios thì chúng ta chỉ cần một codebase cho cả hai. Thậm chí bạn chỉ cần 1 developer là đủ.
    - Hiệu năng cao: so với react native thì flutter có performance cao hơn vì không cần qua một tầng bridge giữa JavaScript và native components.
    - Đẹp: Có thể dễ dàng tạo ra những ứng dụng đẹp bằng các widgets có sẵn của flutter. Có thể tham khảo một số app được xây dựng bằng flutter ở [It's all widgets](https://itsallwidgets.com/)  
    !["Dart"](/assets/posts/flutter-intro/flutter-app-example.gif)

- **Tài liệu kỹ lưỡng**: Documents cuả flutter khá đầy đủ và chi tiết về từng widgets. Đồng thời cũng có có hướng dẫn chi tiết cơ bản cho người mới bắt đầu.
- **Cộng đồng đang phát triển**: Một trong những yếu tố để chọn một công nghệ đó là cộng đồng đằng sau. Tuy hiện tại có thể nói với cộng đồng flutter nó chỉ mới bắt đầu nhưng về cơ bản cũng có một số nơi để develoeprs có thể trao đổi về flutter:
    - [Flutter Awesome](https://flutterawesome.com/): Nơi mà bạn có thể tìm thấy nhiều examples, ứng dụng mẫu, lời khuyên và vân vân mây mây.
    - [Awesome Flutter](https://github.com/Solido/awesome-flutter): Một GitHub repo với danh sách những bài viết, videos, components, utilities v.v
    - [It’s all widgets!](https://itsallwidgets.com/): Một danh sách mở về những ứng dụng được built bằng flutter.
    - [Flutter Community](https://medium.com/flutter-community): Trang medium về articles, tutorials, và các thứ khác.


# Footnotes:
*Flutter tạp lục = miscellaneous notes about flutter, dựa theo cách đặt tên [Phủ biên tạp lục của Lê Quý Đôn](https://www.wikiwand.com/vi/Ph%E1%BB%A7_bi%C3%AAn_t%E1%BA%A1p_l%E1%BB%A5c).