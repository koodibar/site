---
layout: post
current: post
title: "Xử lý hình ảnh bằng Python" 
date: 2019-01-28 22:00
navigation: true
categories: [graphq]
author: hungneox
tags : [python, image-proccessing, opencv]
description: "Xử lý hình ảnh bằng Python (có sử dụng Pillow và OpenCV)"
cover: assets/posts/image-proccessing-python/cover-rick-morty.png
subclass: 'post tag-getting-started'
class: post-template
comments: true
---

# Một chút căn bản về ảnh kỹ thuật số (digital image)

Một hình ảnh (kỹ thuật số) được tạo thành bởi nhiều phần tử gọi là pixel (hay điểm ảnh). Thường thì một hình được biểu diễn bằng một mảng hai chiều gồm nhiều pixels. Mỗi pixel (cụ thể là hình [RGB](https://www.wikiwand.com/en/RGB_color_space)) mang trong mình 3 thông số màu: <span style="color:red">Red</span>, <span style="color:green">Green</span>, <span style="color:blue">Blue</span>.

!["RGB Color Space"](/assets/posts/image-proccessing-python/rgb-cube.png)

Ngoài ra, đối với không gian [RGBA](https://www.wikiwand.com/en/RGBA_color_space) thì nó có một kênh thứ 4 là <span style="color:grey">Alpha</span>, trong đó Alpha là một thông số chỉ độ trong suốt của pixel đó.

!["Pixel"](/assets/posts/image-proccessing-python/pixels.png)

Như đã nói ở trên, một pixel mang 3 giá trị màu, vì trên thực tế mỗi pixel được cấu thành bao gồm 3 sub-pixels. Và pixel cũng không có **kích thước vật lý cụ thể**, mà nó phụ thuộc vào [pixel density](https://www.wikiwand.com/en/Pixel_density). Mỗi pixel chứa được 256 (0-255) giá trị, cho nên về mặt lý thuyết 3 sub-pixels hiện thị được 256^3 = 16777216 (~16 triệu màu). Nhưng tất nhiên là mắt người chưa hẳn đã phân biệt được 16 triệu màu này.

# Xử lý hình ảnh bằng Pillow và OpenCV

Trong toàn bài này mình sẽ sử dụng ảnh này làm ảnh gốc để chỉnh sửa. Phần code có hơi mì ăn liền cho nên bạn nào khó tính vui lòng bỏ qua.

!["Rick and Morty"](/assets/posts/image-proccessing-python/rick-morty.png)

## 1. Chuyển ảnh màu sang grayscale

Về cơ bản thì [grayscale](https://homepages.inf.ed.ac.uk/rbf/HIPR2/gryimage.htm) (hình trắng đen) là loại ảnh mà tất cả pixels chỉ mang thông tin về độ sáng, hay nói cách khác chỉ thể hiện các sắc thái của màu xám. Trong không gian màu RGB, thì màu xám là màu mà các sắc tố Red, Green, Blue có giá trị bằng nhau. Ví dụ màu đỏ là `rgb(255, 0, 0)` thì nếu ta muốn chuyển nó sang xám thì lấy giá trị trung bình của 3 sub-pixel và tạo thành 1 pixel mới `rgb(85, 85, 85)`

### 1.1 Code thủ công

Đầu tiên chúng ta áp dụng lý thuyết ở trên để sửa từng pixel cho ảnh gốc để tạo ra ảnh mới:

{% highlight python %}
from PIL import Image
img = Image.open('rick-morty.png')
pixels = img.load()

new_img = Image.new(img.mode, img.size)
pixels_new = new_img.load()
for i in range(new_img.size[0]):
    for j in range(new_img.size[1]):
        r, b, g = pixels[i,j]
        avg = int(round((r + b + g) / 3))
        pixels_new[i,j] = (avg, avg, avg, 0)
new_img.show()
{% endhighlight %}

Chúng ta có ảnh gốc được chuyển thành grayscale như sau:

!["Grayscale"](/assets/posts/image-proccessing-python/rick-morty-grayscale.png)

### 1.2 Sử dụng [Pillow](https://python-pillow.org/)

Pillow là một bản fork của PIL (Python Image Library) một thư viện xử lý hình ảnh của Python. Do PIL được phát hành từ 2009 và không có cập nhật thường xuyên, cho nên PIL đã bị thay thế bở Pillow trên các bản phân phối của Debian và Ubuntu luôn.

{% highlight python %}
from PIL import Image
img = Image.open("rick-morty.png")

# If you want a greyscale image, simply convert it to the L (Luminance) mode:
new_img = img.convert('L')
new_img.show()

# Or save it to a file
# new_img.save('rick-morty-L.png')
{% endhighlight %}

Kết quả hơi khác so code thủ công ở trên một xíu, ví dụ cái màu áo của Morty ở trên là `rgb(227, 227, 227)` nhưng ở dưới là `rgb(184, 184, 184)`

!["Grayscale Pillow"](/assets/posts/image-proccessing-python/rick-morty-l.png)

## Thay đổi độ tương phản (contrast)

Để thay đổi độ tương phản của pixel bằng `Pillow` khá đơn giản

{% highlight python %}
from PIL import Image, ImageEnhance
# PIL accesses images in Cartesian co-ordinates, so it is Image[columns, rows]
img = Image.open("rick-morty.png")

# Enhance constrast
enhancer = ImageEnhance.Contrast(img)
for i in range(1, 8):
    factor = i / 4.0
    new_img = enhancer.enhance(factor)
    new_img.show()
    # Or save it to file
    # new_img.save('rick-morty-%s.png' % i)
{% endhighlight %}

Trong đó thì factor là một giá trị để kiểm soát độ tương phản, 1.0 là tương đương hình gốc, còn thấp hơn 1.0 là giảm độ tương phản vân vân và mây mây.

> factor – A floating point value controlling the enhancement. Factor 1.0 always returns a copy of the original image, lower factors mean less color (brightness, contrast, etc), and higher values more. There are no restrictions on this value.

!["RGB Color Space"](/assets/posts/image-proccessing-python/rick-morty-contrast.png)

Mình cũng không rõ Pillow thay đổi độ tương phản bằng cách nào, nhưng về lý thuyết chung thì làm tăng/giảm [contrast](https://www.wikiwand.com/en/Contrast_(vision)) là làm tối (darkening) nhưng pixel có giá trị dưới một mức nào đó, và làm sáng (lightening) những pixels có giá trị trên một mức nào đó. Độ chênh lệch này sẽ làm tăng hay giảm sự tương phản.

Các bạn có thể xem thêm công thức thay đổi độ tương phản của pixel [ở đây](https://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/), nhưng kết quả từ công thức này không ổn lắm.

## Thay đổi độ sáng (brightness)

Để thay đổi độ sáng của ảnh bằng Pillow cũng rất đơn giản, ta làm như sau:

{% highlight python %}
from PIL import Image, ImageEnhance
img = Image.open("rick-morty.png")
enhancer = ImageEnhance.Brightness(img)
# Lighter
new_img = enhancer.enhance(1.8)
# Darker
# new_img = enhancer.enhance(0.8)
new_img.show()
{% endhighlight %}

Để thay đổi độ sáng của pixels bằng cách thủ công cũng khá đơn giản, ta chỉ cần tăng hay giảm giá trị của từng pixel là được, chỉ cần lưu ý `truncate` giá trị đó sao cho nó nằm trong khoảng 0-255 là được.

{% highlight python %}
from PIL import Image

def truncate(value):
    if (value < 0):
        return 0
    if (value > 255):
        return 255
    return value

if __name__ == "__main__":
    img = Image.open('rick-morty.png')
    pixels = img.load()

    img_new = Image.new(img.mode, img.size)
    pixels_new = img_new.load()
    brightness = 20
    for i in range(img_new.size[0]):
        for j in range(img_new.size[1]):
            r, b, g = pixels[i,j]
            _r = truncate(r + brightness)
            _b = truncate(b + brightness)
            _g = truncate(g + brightness)
            pixels_new[i,j] = (_r, _b, _g, 255)
    img_new.show()
{% endhighlight %}

!["Brightness"](/assets/posts/image-proccessing-python/rick-morty-brightness.png)


## Làm mờ (Gaussian blur)

[Guassian blur](https://computergraphics.stackexchange.com/questions/39/how-is-gaussian-blur-implemented) Phương pháp làm mờ hình ảnh sử dụng Gussian function để giảm nhiễu và chi tiết trên bức ảnh.

Giải thích ngắn gọn thì cái ma trận 3x3 trong hình được gọi là `kernel`. Chúng ta áp dụng cái filter như hình cho từng pixel thì cuối cùng chúng ta sẽ có một hình đã được làm mờ.

!["Gaussian blur"](/assets/posts/image-proccessing-python/gaussian-blur.jpg)

{% highlight python %}
# Gaussian blur
new_img = img.filter(ImageFilter.GaussianBlur(radius=50))
new_img = img.filter(ImageFilter.GaussianBlur)
new_img.show()
{% endhighlight %}

!["Gaussian blur"](/assets/posts/image-proccessing-python/rick-morty-gaussian-blur-20.png)

## Làm tối 4 góc (vignette) sử dụng OpenCV và numpy

{% highlight python %}
import cv2
import numpy as np

img = cv2.imread('rick-morty.png')
rows, cols = img.shape[:2]

# generating vignette mask using Gaussian kernels
kernel_x = cv2.getGaussianKernel(cols, 200)
kernel_y = cv2.getGaussianKernel(rows, 200)
kernel = kernel_y * kernel_x.T
mask = 255 * kernel / np.linalg.norm(kernel)
output = np.copy(img)

# applying the mask to each channel in the input image
for i in range(3):
    output[:, :, i] = output[:, :, i] * mask

cv2.imshow('image',output)
cv2.waitKey(0)
cv2.destroyAllWindows()
# Or write to a file
# cv2.imwrite('rick-morty-vig.png', output)
{% endhighlight %}

!["Gaussian blur"](/assets/posts/image-proccessing-python/rick-morty-vig.png)


# *Cơm thêm*

Phần này không liên quan tới xử lý hình ảnh ở trên

## Tìm các cạnh bằng phương pháp Canny (Canny edge detection)

{% highlight python %}
import cv2

img = cv2.imread('rick-morty.png', 0)
edges = cv2.Canny(img, 100, 200)
cv2.imshow('image', edges)
cv2.waitKey(0)
cv2.destroyAllWindows()
{% endhighlight %}

!["Canny edges"](/assets/posts/image-proccessing-python/rick-morty-canny.png)


## Vẽ countour của ảnh

Contour trong image proccesing là những đường nối những điểm liền nhau tạo thành hình dáng của vật trong ảnh (không phải contour trong trang điểm). Nó là một công cụ rất hữu ích trong nhận dạng và định danh các vật thể trong hình (object detection and recognition).

{% highlight python %}
import numpy as np
import cv2

img = cv2.imread('rick-morty.png')
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)
contours = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[-2]
for contour in contours:
    cv2.drawContours(img, contour, -1, (0, 255, 0), 3)

cv2.imshow('image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
{% endhighlight %}

!["Contour"](/assets/posts/image-proccessing-python/rick-morty-contour.png)

## Nhận diện gương mặt bằng OpenCV

Sử dụng Haar Cascade classifier của OpenCV. Tải về file [haarcascade_frontalface_default.xml ở đây](https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml)

{% highlight python %}
import cv2

img = cv2.imread('queen.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faceCascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
faces = faceCascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30),
    flags=cv2.CASCADE_SCALE_IMAGE
)

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

cv2.imwrite('queen-fd.jpg', img)
{% endhighlight %}

!["Contour"](/assets/posts/image-proccessing-python/queen-fd.jpg)