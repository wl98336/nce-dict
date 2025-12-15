# Chagne Log

## 2025年12月13日
### project init by `ng new nce-dict`
- √ Which stylesheet format would you like to use? Sass (SCSS)     [ https://sass-lang.com/documentation/- syntax#scss]
- √ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? Yes
- √ Do you want to create a 'zoneless' application without zone.js? Yes
- √ Which AI tools do you want to configure with Angular best practices? https://angular.dev/ai/develop-with-ai None


## 2025年12月15日
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

下面的例子中，第一颗将加载`on 1 Finding Fossil man.mp3`第二课将加载`2.mp3`

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

添加了第一课和第二课的自学导读pdf文件（样例），测试书本和课目切换

样例文件使用pdf-lib生成，样本代码分享在[pdf-lib](https://github.com/wl98336/pdf-split)
