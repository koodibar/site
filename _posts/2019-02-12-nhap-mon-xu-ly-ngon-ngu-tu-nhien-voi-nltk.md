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

Natural language toolkit ([NLTK](https://github.com/nltk/nltk)) là một thư viện python phổ biến trong NLP. Nó được áp dụng thành công và rộng rãi trong việc dạy và học NLP, cũng như xây dựng prototype và các hệ thống nghiên cứu. NLTK rất dễ học và sử dụng. Trong bài viết này chúng ta sẽ tìm hiểu cách sử dụng thư viện này, mà chủ yếu tập trung vào phần **xử lý văn bản**.

# Cài đặt NLTK

Cũng như bao thư viện python khác, ta có thể cài đặt NLTK trong một nốt nhạc

```
pip install nltk
```

# Một số tính năng của NLTK 

## 1 Tokenization
*Tokenization* là bước đầu tiên của quá trình phân tích xử lý văn bản. Quá trình này bao gồm việc bóc tách, bẻ nhỏ những đoạn văn thành những thành phần nhỏ hơn như là câu và từ.

Ví dụ ta có đoạn văn bản sau:

{% highlight python %}
crawl_text="""With the support of the
REPUBLIC, General Leia Organa
leads a brave RESISTANCE.
She is desperate to find her
brother Luke and gain his
help in restoring peace
and justice to the galaxy."""
{% endhighlight %}

### 1.1. Tách các đoạn văn thành từng câu (sentence tokenization)

Sentence tokenizer (sent_tokenizer) tách văn bản thành nhiều câu

{% highlight python %}
from nltk.tokenize import sent_tokenize
tokenized_text=sent_tokenize(crawl_text)
print(tokenized_text)
{% endhighlight %}

Kết quả

{% highlight python %}
[
    'With the support of the\nREPUBLIC, General Leia Organa\nleads a brave RESISTANCE.', 
    'She is desperate to find her\nbrother Luke and gain his\nhelp in restoring peace\nand justice to the galaxy.'
]
{% endhighlight %}

### 1.2. Tách một câu thành từng từ (word tokenization)

{% highlight python %}
from nltk.tokenize import word_tokenize
tokenized_word=word_tokenize(crawl_text)
print(tokenized_word)
{% endhighlight %}

{% highlight python %}
[
    'With', 'the', 'support', 'of', 'the', 'REPUBLIC', ',', 'General', 'Leia', 'Organa', 'leads', 'a', 'brave', 'RESISTANCE', '.', 
    'She', 'is', 'desperate', 'to', 'find', 'her', 'brother', 'Luke', 'and', 'gain', 'his', 'help', 'in', 'restoring', 'peace', 'and', 'justice', 'to', 'the', 'galaxy', '.'
]
{% endhighlight %}
## 2. Tìm tầng suất xuất hiện của các từ (frequency distribution)

{% highlight python %}
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
import matplotlib.pyplot as plt
fdist = FreqDist(tokenized_word)
print(fdist)
{% endhighlight %}

```
<FreqDist with 31 samples and 36 outcomes>
```

{% highlight python %}
fdist.most_common(2)
{% endhighlight %}

```
[('the', 3), ('.', 2)]
```

{% highlight python %}
fdist.plot()
plt.show()
{% endhighlight %}

!["Word count plot"](/assets/posts/nhap-mon-nltk/wcplot.png)