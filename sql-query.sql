with average_salary (avg_sal) as 
(select avg(salary) from employee)
select *
from employee e, average_salary av
where e.salary > av,avg_sal;

select *
from employee
where salary > (select avg(salary) from employee);

with table_name (columns)
     as (query),
     table_name2 (columns)
     as (query)

select * 
from table_name;

-- Find all employee details who work in a department.

select * from emp where
exists (select * from dept
where dept.eid = emp.eid);

-- Write a query to display all the Department names along with the number of employees working in that --

select deptartment,count(*)
from employee
group by department;

-- Write a query to display al the Department names where number of employees are less than two.

select department
from employee
group by department
having count(*) < 2;

-- Find employee in departmnet where departmnent having number of employees are less than two.
select employee_name from employee 
where department = (select department
                    from employee
                    group by department
                    having count(*) < 2)

-- Find the name of the employee who are working on a project --
select employee_name from employee
where employee_id IN (select employee_id from project)                    

--Find the name of the employee who is not working in any project--
select employee_name from employee
where employee_id NOT IN (select employee_id from project)

-- Find the details of employee who is working on atleast one project --
select * from employee
where employee_id exists (select employee_id from project 
                              where employee.employee_id = project.employee_id)

-- Find the details of employee who is not working on any project --
select * from employee
where employee_id not exists (select employee_id from project 
                              where employee.employee_id = project.employee_id)                             

-- Find the employee having maximum salary in department -- 
Select E_name,dept, salary
From emp
where (dept , salary) IN
         (Select dept, max(salary)
          From emp
          Group by dept )

-- Find nth maximum salary --
select id,salary from emp e1
where n - 1 = (select count(distinct salary) from emp e2
                                        where e1.salary < e2.salary);

                                        -- // take one row from table one and check how many salaries are greather than that salary.
