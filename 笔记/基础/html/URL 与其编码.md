# URL 与其编码

## 什么是 URL

URL 也被称为网址。URL 的英文全称是 Uniform Resource Locator，中文也译为“统一资源定位符”。

URL 可以由单词组成，比如 “mafengshe.com”，或者是IP地址：192.168.1.1。大多数人在网上冲浪时，会键入网址的域名，因为名称比数字容易记忆。

他遵守以下的语法规则：

```
scheme://host:port/path/filename
```

其中

- scheme - 定义因特网服务的类型。最常见的类型是 http
- host - 定义域主机名
- port - 定义主机上的端口号（http 的默认端口号是 80）
- path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
- filename - 定义文档/资源的名称

URL 遵守一种标准的语法，它由协议、主机名、域名、端口、路径、以及文件名这六个部分构成，其中端口可以省略。具体语法规则如下：
scheme://host.domain:port/path/filename

在上述语法规则中，scheme 表示协议，host 表示主机名，domain 表示域名，port 表示端口（可以省略），path 表示文件的路径，filename 表示文件名称。接下来我们详细看一下这几部分到底是如何使用的。

![image-20230913161141894](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20230913161141894.png)

### 常见 URL Schemes

| Scheme | 协议名             | 含义                                |
| :----- | :----------------- | :---------------------------------- |
| http   | 超文本传输协议     | 以 http:// 开头的普通网页。不加密。 |
| https  | 安全超文本传输协议 | 安全网页。加密所有信息交换。        |
| ftp    | 文件传输协议       | 用于将文件下载或上传至网站。        |
| file   |                    | 您计算机上的文件。                  |

## URL 字符编码

> URL 编码会将字符转换为可通过因特网传输的格式。

- URL 只能使用 ASCII 字符集来通过因特网进行发送。
- 由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。
- URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。
- URL 不能包含空格。URL 编码通常使用 + 来替换空格。

详细的 URL 编码 可以参考[这里](http://www.w3school.com.cn/tags/html_ref_urlencode.html)





1. 什么是 URL？

   URL 也被称为网址。URL 的英文全称是 Uniform Resource Locator，中文也译为“统一资源定位符”。

2. URL 有哪些常见的 Schemes？他们各是什么含义？

   + http:超文本传输协议,以 http:// 开头的普通网页。不加密。
   + https:安全超文本传输协议,安全网页。加密所有信息交换。
   + file:您计算机上的文件。
   + ftp:文件传输协议,用于将文件下载或上传至网站。

3. URL 有哪些约束？

   > URL 编码会将字符转换为可通过因特网传输的格式。

   - URL 只能使用 ASCII 字符集来通过因特网进行发送。
   - 由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。
   - URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。
   - URL长度限制：不同的浏览器和服务器对URL的长度有限制，通常建议不要超过2048个字符。
   - 协议：URL必须以协议开头，例如  `http://` 或  `https://`。
   - 域名：URL中的域名部分必须符合域名规范，包括合法的域名字符、正确的域名格式和有效的顶级域名（TLD）。 
   - 路径：URL的路径部分应该按照合适的层级结构组织，使用斜杠（ `/` ）分隔不同的目录或文件。 
   - 查询参数：URL可以包含查询参数，用于向服务器传递额外的信息。查询参数通常使用  `?`  开始，键值对使用  `&`  分隔。
   - 锚点：URL可以包含锚点，用于在页面内部定位到具体的位置。锚点通常使用  `#`  开始，后面跟着目标元素的ID。
   - URL 不能包含空格。URL 编码通常使用 + 来替换空格。

4. 请将以下 URL 转换成合法的 URL

   ```
   baidu.com/s?wd=码蜂社 前端
   ```

   https://baidu.com%2Fs%3Fwd%3D%E7%A0%81%E8%9C%82%E7%A4%BE+%E5%89%8D%E7%AB%AF

   

5. 请提取以下 URL 的 scheme，host，port，path，filename

   ```
   https://www.mafengshe.com/course/fe-senior/ad
   ```

   ```
   http://127.0.0.1:3000/course/fe-senior/ad
   ```

   + scheme：https

     主机名(域名)：www.mafengshe.com

     port：80（默认，没写明的情况下默认是80）

     path:/course/fe-senior

     filename:ad

   + scheme:http

     host:127.0.0.1

     port:3000

     path:/course/fe-senior
   
     filename:ad

