-- 1. 通过 * 把 users 表中所有的数据查询出来
-- select * from users

-- 2. 从 users 表中把 username 和 password 对应的数据查询出来
-- select username, password from users

-- 3. 向 users 表中，插入新数据，username 的值为 tony stark  password 的值为 0987123
-- insert into 表 (要插入的列名，用英文逗号分割) values (要插入的数据，用英文逗号分割)
-- insert into users (id,username, password) values (4,'tony stark1523', '0987123')
-- select * from users

-- 4. update 更新某一行中的某一列
-- update users set password='888888' where id=3
-- select * from users
 
-- 5. update 更新某一行中的多个列
-- update users set password='admin123', status=1 where id=2
-- select * from users

-- 6. delete 删除 列表中某一列
-- delete from users where id=7
-- select * from users


-- 查询语句中的 where 条件
-- select 列名称 from 表名称 where 列 运算符 值
-- select * from users where id <> 2
-- and 表示且，or 表示或
-- select * from users where id != 3 and status=1 
-- select * from users where id=1 or status=1

-- order by 语句用于根据指定的列对结果集进行排序 
-- order by 语句默认按照升序对记录进行排序 asc，如果希望按照降序进行排序，可以使用 desc 关键字
-- select * from users order by status desc
-- select * from users order by status asc, username desc

-- count(*) 函数用于返回查询结果的总数据条数，语法格式如下： 
-- select count(*) from 表名称 
-- select count(*) from users where status=1

-- 使用 as 为列设置别名
-- select count(*) as total from users where id > 2 