---
layout: post
current: post
title: "Nhập môn xử lý ngôn ngữ tự nhiên bằng NLTK" 
date: 2019-02-12 0:00
navigation: true
categories: [python, nltk]
author: hungneox
tags : [python, natural language proccessing]
description: "Xử lý ngôn ngữ tự nhiên bằng NLTK trong Python"
cover: assets/posts/nhap-mon-nltk/cover.jpg
subclass: 'post tag-getting-started'
class: post-template
comments: true
toc: true
---

# Xử lý ngôn ngữ tự nhiên (Natural lanague processing) là gì?

Xử lý ngôn ngữ tự nhiên (từ đây gọi tắt là NLP) là một nhánh của khoa học máy tính, mà cụ thể là trí tuệ nhân tạo, tập trung vào các ứng dụng thao tác trên ngôn ngữ tự nhiên của con người bao gồm tiếng nói, chữ viết. Có thể thấy các ứng dụng của NLP trong đời sống hàng ngày như:

- Nhận dạng giọng nói như: Siri của Apple, Alexa của Amazon v.v
- Nhận dạng chữ viết: OCR
- Dịch tự động: Google Translate
- Chặn spam: Google spam filter
- Tìm kiếm thông tin: full text search engines như Solr, ElasticSearch
- Tóm tắt / phân loại văn bản
- Khai phá dữ liệu (data mining)

# Thư viện NLTK 

Natural language toolkit ([NLTK](https://github.com/nltk/nltk)) là một thư viện python phổ biến trong NLP. Nó được áp dụng thành công và rộng rãi trong việc dạy và học NLP, cũng như xây dựng prototype và các hệ thống nghiên cứu. NLTK rất dễ học và sử dụng. Trong bài viết này chúng ta sẽ tìm hiểu cách sử dụng thư viện này.

# Cài đặt NLTK

Cũng như bao thư viện python khác, ta có thể cài đặt NLTK trong một nốt nhạc

```
pip install nltk
```