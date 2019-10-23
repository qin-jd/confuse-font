--
-- 表的结构 `xn_font`
--

CREATE TABLE IF NOT EXISTS `xn_font` (
  `id` int(11) NOT NULL,
  `name` char(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '名称',
  `dict` text COLLATE utf8_unicode_ci NOT NULL COMMENT '字典'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='字体文件与字典的映射';

--
-- 转存表中的数据 `xn_font`
--
