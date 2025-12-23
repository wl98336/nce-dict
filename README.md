# NCE dict
本项目旨在构建一个web应用协助新概念英语的知识查询

[Live Demo](https://node1.gagps.net/)

## 代码说明
该web应用需要一个服务器端提供查询结果,服务器端简单实现参见[nce-dict-server](https://github.com/wl98336/nce-dict-server "新概念英语词典接口")

### 查询支持中英文，根据字典数据展示提示

#### 提示字典中第一个符合条件的条目及其之后的九个条目
比如，

- 输入“瓶”，提示"瓶厂","瓶口","瓶子","瓶盖","瓶装","瓶里","甘甜","甘苦","甚佳","甚微"

- 输入"rar", 提示"rare","rarely","rarity","rashly","rastus","rate","rated","rather","rational","rats"

#### 词典中没有符合条件的条目时不更新提示

- 输入“瓶颈”，提示依然是 "瓶厂","瓶口","瓶子","瓶盖","瓶装","瓶里","甘甜","甘苦","甚佳","甚微"

- 输入"rarr", 提示依然是 "rare","rarely","rarity","rashly","rastus","rate","rated","rather","rational","rats"

### 搜过结果按照某一册/某一课合并显示

- 搜索的词语在句子中高亮显示
- 点击某一课（显示为链接）可以跳转到该课课文
- 同时展示多个菜单 阅读/单词/笔记/导读/打字/引用/词典，其中导读和词典会提示登录

### 添加书本列表 /assets/books.json
书本格式如下
```
[
    {
        "id": 1,
        "zh": "新概念第一册",
        "en": "First Things First",
        "path": "book-1"
    }
]
```
### 添加单元配置，/assets/book-${id}/units.json
配置课文所属单元，用于简化课时选择页面,格式如下
```
[
    {
        "id": 1,
        "en": "part 1",
        "zh": "第一部分",
        "lessons": [
            {
                "id": 1,
                "en": "Excuse me！",
                "zh": "对不起！"
            }
        ]
    }
]
```
### 添加单词， /assets/book-${id}/words.json
以课文为单位，每个单词为一个字符串，音标用[]包围，词性以.结束, 格式如下
```
[
    {
        "lesson": 1,
        "words": [
            "excuse [ik'skju:z] v.原谅",
            "me [mi:, mi] pron.我(宾格)",
            "yes [jes] ad.是的",
            "is [iz, s, z, əz] v.be动词现在时第三人称单数",
            "this [ðis] pron.这",
            "your [jə:, jɔ:, jər, jɔ:r] 你的，你们的",
            "handbag ['hændbæg] n.(女用)手提包",
            "pardon ['pɑ:dən] int.原谅，请再说一遍",
            "it [it] pron.它",
            "thank you [ˈθæŋkjuː] 感谢你(们)",
            "very much [ˈverɪ mʌtʃ] 非常地"
        ]
    }
]
```
### 添加笔记， /assets/book-${id}/notes.md
新概念一至四册笔记来源是[protogenesis](https://github.com/protogenesis/New-Concept-English)

以课文为单位，每课以一级标题`# Lesson ${id}`开始,其他行不能有一级标题

其中id可以是以下之一
- 数字          //笔记属于某一课
- 数字&数字     //笔记属于某两课
- 数字-数字     //笔记属于多课


```
# Lesson 1

#### Main knowledge

+ 一般疑问句的构成形式

###### 一般疑问句

一般疑问句将be动词提前,即将一般陈述句的be动词提前到句首


```

### 添加音频配置文件（可选）， /assets/book-${id}/audio.json

以课文为单位，配置该课音频文件名`${lesson_id}: ${audioName}`，缺省使用`${lesson_id}.mp3`

下面的例子中，第一课将加载`on 1 Finding Fossil man.mp3`第二课将加载`2.mp3`

```
{
    "1": "Lesson 1 Finding Fossil man.mp3",
    "10": "Lesson 10 Silicon valley.mp3"
}
```

### 添加音频文件， /assets/book-${id}/audio/**.mp3
添加了第一课的音频文件作为实例，音频以课文为单位，文件名需要与audio.json中的文件名匹配


### 添加导读配置文件（可选）， /assets/book-${id}/guide.json

以课文为单位，配置该课音频文件名`${lesson_id}: ${fileName}`，缺省使用`${lesson_id}.pdf`

下面的例子中，第一颗将加载`example.pdf`第二课将加载`2.pdf`

```
{
    "1": "example.pdf",
}
```

### 添加自学导读， /assets/book-${id}/audio/**.pdf

pdf按课加载已避免加载时间过长，单个pdf文件的拆分可以使用pdf-lib

样本代码分享在[pdf-lib](https://github.com/wl98336/pdf-split)


## 配置文件

[Live Demo](https://node1.gagps.net/)中所用到的所有文件都可以在[nce-dict-assets](https://github.com/wl98336/nce-dict-assets)找到,内容可能涉及版权，请勿商用

