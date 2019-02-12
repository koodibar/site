---
layout: post
current: post
title: "Cơ bản về phân tích văn bản bằng NLTK" 
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

# Phân tích văn bản (text analysis) là gì?

Phân tích văn bản là một phần của xử lý ngôn ngữ tự nhiên (Natural Language Proccessing - NLP), nó là một quá trình phân tích (parsing) văn bản thô để thu thập được những thông tin hữu ích từ các văn bản phi cấu trúc (free text). Ví dụ như phân tích các tweets để tìm ra xu hướng phổ biến trên twitter, hay Amazon có thể phân loại được review của khách hàng cho một sản phẩm là tích cực hay tiêu cực (xem thêm [Detect sentiment from customer reviews using Amazon Comprehend](https://aws.amazon.com/blogs/machine-learning/detect-sentiment-from-customer-reviews-using-amazon-comprehend/)).

# Thư viện NLTK 

Natural language toolkit ([NLTK](https://github.com/nltk/nltk)) là một thư viện python phổ biến trong NLP. Nó được áp dụng thành công và rộng rãi trong việc dạy và học NLP, cũng như xây dựng prototype và các hệ thống nghiên cứu. NLTK rất dễ học và sử dụng. Trong bài viết này chúng ta sẽ tìm hiểu cách sử dụng thư viện này, mà chủ yếu tập trung vào phần **xử lý văn bản**.

# Cài đặt NLTK

Cũng như bao thư viện python khác, ta có thể cài đặt NLTK trong một nốt nhạc

```
pip install nltk
```

# Một số tính năng của NLTK 

## 1. Tokenization
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

## 3. Stopwords

Stopwords là những từ được coi là gây nhiễu hay vô nghĩa trong trong. Ví dụ như a, an, the, am, are, this v.v. Thường trong quá trình index dữ liệu, các search engine (như ElasticSearch) sẽ loại bỏ các stopwords.

Trong NLTK có định nghĩa sẵn các stopwords cho từng ngôn ngữ. Ví dụ để lấy tất cả các stopword trong tiếng Anh

{% highlight python %}
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words=set(stopwords.words("english"))
{% endhighlight %}


```
{"mightn't", 'o', "didn't", "wouldn't", 'what', 'any', 'here', 'ourselves', 'during', "weren't", 'do', 'its', 'below', 'shan', 'there', 'some', 'hers', 'our', 'why', "you'll", 'herself', 'mightn', 'a', 'their', 'these', 're', "haven't", 'then', "mustn't", 'm', 'myself', 've', 'whom', 'out', 'above', 'the', 'himself', 'hasn', 'am', 'is', "hadn't", "shouldn't", 'doesn', 'too', "you've", "wasn't", "needn't", 'further', 'an', "you're", 'no', 'up', 'will', 'me', "it's", 'does', 'as', 'be', 'yourselves', 'few', 'she', 'down', 'about', 'are', 'her', 'while', 'other', 'ours', 'can', 'haven', 'where', 'yourself', "you'd", 'only', 'not', 'most', "couldn't", "shan't", 'won', 'was', 'has', 'shouldn', 'theirs', 'couldn', 'll', 'yours', 'how', 'his', "isn't", 'ma', 'now', 'themselves', "should've", 'nor', 'them', 'been', 'those', 'or', 'at', 'wasn', 'same', 'such', 's', 'which', 'on', 'don', 'aren', 'just', 'each', 'from', 'to', 'my', 'but', 'it', 'i', 'more', 't', 'had', "doesn't", 'before', "don't", 'have', 'being', 'once', 'so', 'very', 'should', 'over', 'doing', 'isn', 'all', 'needn', 'under', 'when', "she's", 'between', 'for', 'again', 'he', 'through', 'ain', 'hadn', 'off', 'd', 'were', 'against', 'in', 'your', 'into', 'with', 'because', 'didn', 'and', 'y', 'mustn', "aren't", 'this', 'having', "hasn't", 'weren', 'both', 'than', 'you', 'by', 'wouldn', "that'll", 'we', 'that', 'did', 'of', 'if', 'him', 'itself', 'they', "won't", 'own', 'until', 'after', 'who'}
```

Mặc định thì NLTK chỉ hỗ trợ một số ngôn ngữ ở Châu Âu:

- english
- german
- swedish
- ...

## 4. Stemming