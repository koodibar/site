---
layout: post
current: post
title: "Tìm hiểu Pandas trong 15 phút" 
date: 2019-02-10 22:00
navigation: true
categories: [python, pandas]
author: hungneox
tags : [python, data proccessing]
description: "Hướng dẫn thao tác với dữ liệu bằng thư viện pandas trong python"
cover: assets/posts/nhap-mon-pandas/cover.jpg
subclass: 'post tag-getting-started'
class: post-template
comments: true
toc: true
---

# Giới thiệu về pandas 

[Pandas](https://pandas.pydata.org/) là một thư viện python mã nguồn mở khá phổ biến để xử lý và phân tích dữ liệu, được phát triển vào năm 2008 bởi [Wes McKinney](http://wesmckinney.com/). Cụ thể hơn nó cung cấp những cấu trúc dữ liệu linh hoạt để thao tác với các dữ liệu dạng bảng và chuỗi thời gian (time series). Đây là cũng một trong những thư viện quan trọng trong `data science` hiện nay.

Thư viện pandas rất phù hợp để xử lý các dữ liệu dạng bảng (tabular data). Không những nó hỗ trợ đọc dữ liệu từ [nhiều nguồn khác nhau](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html) như text, csv, excel, json, sql, hdf5, v.v. Mà nó còn giúp chúng ta kết hợp, thao tác và phân tích dữ liệu từ nhiều nguồn này lại. Có thể nói là nó giúp làm hàng tá thứ mà chúng ta muốn trên các nguồn dữ liệu thô một cách thật dễ dàng.

# Các kiểu dữ liệu trong pandas

Trong pandas có hai kiểu dữ liệu chính là **Series** và đặc biệt là **DataFrame**. Pandas cũng cung cấp rất nhiều chức năng tiện lợi và hiệu suất cao cho DataFrame, chúng ta có thể tìm hiểu thêm về các chức năng này bên dưới.


| Cấu trúc dữ liệu | Kích thước | Mô tả                                                           |
|------------------|------------|-----------------------------------------------------------------|
| Series           | 1 chiều    | Là dạng dữ liệu 1 chiều như array (size immutable)              |
| DataFrame        | 2 chiều    | Là dạng dự liệu 2 chiều như bảng trong database (size mutable)  |
| Panel            | 3 chiều    | Là dạng dữ liệu 3 chiều, bao gồm nhiều DataFrame (size mutable) |

!["Panel"](/assets/posts/nhap-mon-pandas/data-structure.jpg)


# Cài đặt pandas

Chúng ta có thể dễ cài đặt pandas trong vòng một nốt nhạc với pip

```
pip install pandas
```

# Một số thao tác cơ bản trên dữ liệu với pandas

## 1. Đọc dữ liệu từ file csv

Để đọc một file csv từ bên ngoài, ta chỉ cần dùng hàm `read_csv`, nó sẽ trả về cho ta một `DataFrame`. Mặc dịnh thì nó sẽ sử dụng dấu phẩy (comma) làm delimeter, tuy nhiên chúng ta cũng có thẻ tuỳ biến tham số delimeter, file encoding cũng như tự thêm tên các cột cho file csv không có headers. Các bạn có thể tham khảo thêm chữ ký đầy đủ của hàm này [ở đây](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)

Ví dụ ta có file `actors.cvs` như sau

{% highlight csv %}
Name,Sex,Age,Height,Weight
Alex,M, 41,74,170
Bert,M, 42,68,166
Carl,M, 32,70,155
Dave,M, 39,72,167
Elly,F, 30,66,124
Fran,F, 33,66,115
Gwen,F, 26,64,121
Hank,M, 30,71,158
Ivan,M, 53,72,175
Jake,M, 32,69,143
Kate,F, 47,69,139
Luke,M, 34,72,163
Myra,F, 23,62, 98
Neil,M, 36,75,160
Omar,M, 38,70,145
Page,F, 31,67,135
Quin,M, 29,71,176
Ruth,F, 28,65,131
{% endhighlight %}

Đoạn code sau sẽ load file `biostats.csv` và hiện thị 5 dòng đầu tiên. Kết quả được thực thi và hiện thị trên Jypiter.

{% highlight python %}
import pandas as pd 
biostats_df = pd.read_csv("biostats.csv")
biostats_df.head(5)
{% endhighlight %}

!["Panel"](/assets/posts/nhap-mon-pandas/biostats.jpg)

## 2. Lấy một số cột dữ liệu

Để lấy dữ liệu của một số cột nhất định, ta chỉ cần truyền danh sách các cột ta muốn lấy vào như sau:

{% highlight python %}
biostats_df[["Name", "Age"]]
{% endhighlight %}

Đoạn này tương đương với câu select sau trong SQL

{% highlight sql %}
SELECT Name, Age FROM biostats
{% endhighlight %}

!["Select columns"](/assets/posts/nhap-mon-pandas/name_age.jpg)

## 3. Lấy dữ liệu theo điều kiện

Về cơ bản thì chúng ta có thể viết conditional expression vào bên trong  phần ngoặc vuông `biostats_df[expresion goes here]`

### Tìm tất cả người có giới tính là `M`

{% highlight python %}
biostats_df[biostats_df.Sex == 'M']
{% endhighlight %}

Đoạn này tương đương với câu select sau trong SQL

{% highlight sql %}
SELECT * FROM biostats WHERE Sex = 'M'
{% endhighlight %}

!["Select columns"](/assets/posts/nhap-mon-pandas/sex_m.jpg)

### Tìm tất cả người có tuổi bé hơn 30 và lớn hơn 25

{% highlight python %}
biostats_df[(biostats_df.Age < 30) & (biostats_df.Age > 25)]
{% endhighlight %}

Chúng ta cũng có thể query như SQL

{% highlight python %}
biostats_df.query("Age > 25 & Age < 30")
{% endhighlight %}

!["Where"](/assets/posts/nhap-mon-pandas/where-condition.jpg)

### Tìm tên những người có chứa cụm từ cụ thể

Ví dụ tìm tất cả người mà tên có chứa cụm "an"

{% highlight csv %}
biostats_df[biostats_df.Name.str.contains('an')]
{% endhighlight %}

!["Contains"](/assets/posts/nhap-mon-pandas/an.jpg)

## 4. Thêm/Xoá cột dữ liệu
### Thêm một cột trên DataFrame

Về cơ bản thì **DataFrame** khá giống Array, vị dụ để thêm một cột năm sinh ta làm như sau

{% highlight python %}
df_len = len(biostats_df)
birth_year = [(2019 - biostats_df.iloc[i].Age) for i in range(df_len)]
biostats_df['Birth Year'] = birth_year
biostats_df.tail(5)
{% endhighlight %}

!["Birth Year"](/assets/posts/nhap-mon-pandas/birth_year.jpg)

### Xoá một/ nhiều cột trên DataFrame

Lưu ý nó chỉ trả về một bản copy của DataFrame đã bị xoá các cột dự liệu. DataFrame gốc vẫn không thay đổi

{% highlight python %}
biostats_df.drop('Name', axis=1) # Xóa 1 cột
biostats_df.drop(['Height', 'Weight'], axis=1) # Xoá nhiều cột
biostats_df.drop(columns=['Birth Year', 'Age']) # Xoá nhiều cột
{% endhighlight %}

## 5. Các thống kê cơ bản

### Mô tả cơ bản về DataFrame

Hàm `describe()` trên DataFrame trả về các thống kê cơ bản của DataFrame đó

{% highlight python %}
biostats_df.describe()
{% endhighlight %}

!["Describe"](/assets/posts/nhap-mon-pandas/describe.jpg)

### Tính giá trị trung bình theo nhóm

Ví dụ ta tính giá trị trung bình của tất cả các dòng nhóm theo giới tính

{% highlight python %}
biostats_df.groupby('Sex').mean()
{% endhighlight %}


!["Mean"](/assets/posts/nhap-mon-pandas/mean.jpg)

### Vẽ biểu đồ phân bố giá trị của một cột

**Bar chart**

{% highlight python %}
import matplotlib.pyplot as plt
biostats_df['Height'].value_counts().plot(kind='bar')
{% endhighlight %}

!["Bars"](/assets/posts/nhap-mon-pandas/height-bars.jpg)

**Pie chart**

{% highlight python %}
import matplotlib.pyplot as plt
biostats_df['Age'].value_counts().plot(kind='pie')
{% endhighlight %}

!["Pie"](/assets/posts/nhap-mon-pandas/pie.jpg)

## 6. Thao tác trên DataFrame

### Join 2 DataFrame

Giả sử chúng ta có 2 DataFrames, và chúng ta muốn join chúng lại (như join hai bảng trong database)

{% highlight python %}
colors_df = pd.DataFrame({'Id': ['C0', 'C1', 'C2', 'C3', 'C4', 'C5'],
           'Name': ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'Purple']})

items_df = pd.DataFrame({'Id': ['D0', 'D1', 'D2', 'D3', 'D4', 'D5'],
           'Name': ['Ballon', 'Tree', 'Car', 'Sand', 'Phone', 'T-Shirt'],
           'Color': ['C0', 'C1', 'C2', 'C3', 'C4', 'C5']
           })
items_df.set_index("Color").join(colors_df.set_index('Id'), lsuffix='_item', rsuffix='_color')
{% endhighlight %}

!["Join"](/assets/posts/nhap-mon-pandas/join.jpg)

### Sắp xếp lại DataFrame

{% highlight python %}
biostats_df.sort_values('Age', ascending=True)
{% endhighlight %}

!["Join"](/assets/posts/nhap-mon-pandas/sorted.jpg)

### Ghi DataFrame thành file csv

{% highlight python %}
colors_df.to_csv('colors.csv')
{% endhighlight %}


# Tham khảo
1. [Intro to Data Structures- https://pandas.pydata.org/pandas-docs/version/0.20/dsintro.html](https://pandas.pydata.org/pandas-docs/version/0.20/dsintro.html)
2. [Stackoverflow - https://stackoverflow.com/questions/15315452/selecting-with-complex-criteria-from-pandas-dataframe](https://stackoverflow.com/questions/15315452/selecting-with-complex-criteria-from-pandas-dataframe)
3. [Pandas_(software) Wikiwand - https://www.wikiwand.com/en/Pandas_(software)](https://www.wikiwand.com/en/Pandas_(software))
