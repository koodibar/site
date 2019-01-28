---
layout: post
current: post
title: "Nhập môn GraphQL" 
date: 2019-01-12 23:00
navigation: true
categories: [graphq]
author: hungneox
tags : [webassembly]
description: "Nhập môn GraphQL"
cover: assets/posts/graphql/graphql-cover.jpeg
subclass: 'post tag-getting-started'
class: post-template
comments: true
published: false
---

# GraphQL là gì - có ăn được không?

Tóm gọn trong vài chữ, thì [GraphQL](https://graphql.org/) là một ngôn ngữ truy vấn dữ và điều khiển dữ liệu. Nói theo kiểu bình dân nó như `SQL` cho API. Tới đây thì cũng không cần phải nói thêm, GraphQL không ăn được, tuy nhiên nếu vận dụng nó vào dự án của bạn có khi nó sẽ giúp tiết kiệm được chi phí hoặc tăng lương 😛!

GraphQL được phát minh và sử dụng nội bộ ở Facebook vào năm 2012, trước khi nó được cung cấp cho bà con xài hồi 2015. Ngôn ngữ truy vấn này có một số đặc điểm chính:

- Nó giúp phía client chỉ định được chính xác dữ liệu trả về
- Nó giúp lấy dữ liệu từ nhiều nguồn (hiểu là endpoints cũng được) dễ hơn
- Dữ liệu dùng trong GraphQL có kiểu (data types)

Ví dụ dưới đây là một câu truy vấn GraphQL đơn giản:

!["GraphQL example 1"](/assets/posts/graphql/graphq-example-1.jpg)

# GraphQL giúp bạn giải quyết vấn đề gì?

### 1. Vấn đề đầu tiên: Qúa nhiều end-points để làm những chuyện cụ thể

Lấy ví dự từ facebook, giả sử ta cần hiển thị một list các `posts`, và bên trong từng `post` ta lại muốn nó chưa một danh sách các `users` đã like bài viết đó bao gồm cả avatar.

Nhưng sau đó, ta muốn xây dựng một ứng dụng mobile, thì lượng dữ liệu trả về có vẻ dư thừa và làm nó load chậm. Bây giờ ta lại phài tách API thành ra *hai* end points, một trả về `posts` cho web có chứa `likes` và một end point khác chỉ trả về các thông tin tối thiểu của các `posts` cho mobile.

!["GraphQL example 1"](/assets/posts/graphql/posts.png)

Đây cũng chỉ là một trường hợp cụ thể, nhưng bệnh chung của REST là chúng ta phải quá gửi nhiều request nhỏ tới nhiều end points để lấy các thông tin khác nhau, hoặc phải trả về dư thừa dữ liệu mà không phải lúc nào client cũng cần. Điều này nghe có vẻ vô hại, nhưng đôi khi lượng dữ liệu trả về quá lớn có thể làm client mobile tải rất chậm và server lúc nào cũng phải xử lý một lượng thông tin dư thừa.

GraphQL mang lại một ngôn ngữ truy vấn, giúp client có thể yêu cầu phía server trả về chính xác những gì mình yêu cầu. Ví dụ đây là một câu truy vấn GraphQL đơn giản

```
{
  users {
    id
    name
  }
}
```

### 2. Vấn đề thứ hai: Document của API

Một trong những vấn đề tiếp theo của REST là ta phải biết document mới dùng được. Tức là số lượng fields, tên từng field và các ràng buộc dữ liệu vân vân và mây mây. Vấn đề này thường được giải quyết bằng [swagger](https://swagger.io), tuy nhiên nó cũng không tự động phải phải có một ai đó viết document thì mới được. 

Ngược lại với REST, thì bản thân của GraphQL là **self-documented** API, nó có `schema` (do developer định nghĩa), cho nên mặc định là ta có thể xem được bằng cách gửi [instrospection query](https://graphql.org/learn/introspection/). Nếu như dùng một số graphql tool như [graphiql](https://github.com/graphql/graphiql) hay [playground](https://github.com/prisma/graphql-playground) thì hầu như ta chẳng cần phải làm gì thêm cả.

# GraphQL gồm có gì?

GraphQL Có 3 thành phần chính:

- Schema
- Queries/Mutations
- Resolvers


# Tham khảo
1. [So what’s this GraphQL thing I keep hearing about?](https://medium.freecodecamp.org/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf)