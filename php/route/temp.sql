//セレクト
SELECT calam1,calam2
FROM table_name
WHERE calam1 = 1

//インサート
INSERT INTO table_name(calam1, calam2, calam3)
VALUES
('val1','val2',1),
('val1','val2',2)


INSERT INTO bid(user_id,car_id,bid_price,time)
VALUES(1,5,10000,'2022-11-30 13:52:30')


INSERT INTO car( `car_type_id`, `purchase_price`, `body_type`, `model_year`, `mileage`, `is_actual_driving`, `color`, `automatic_or_mission`, `displacement`, `number_of_passengers`, `drive_system`) 
VALUES (6,100000,100,2015,90000,1,100,1,100,4,100)

add_exhibit?car_id=3&lowest_price=10&first_price=10&bid_increase=10&now_price=10&time_from=null&time_to=null
/add_car?car_type_id=6&purchase_price=100000&body_type=1&model_year=%272015%27&mileage=90000&is_actual_driving=1&color=100&vehicle_inspection_expiration_date=%27%27&automatic_or_mission=1&displacement=100cc&number_of_passengers=4&drive_system=100&equipment=%27%27


mileage BETWEEN mileage_min AND mileage_max
mileage >= mileage_min
mileage 

SELECT *
FROM car AS c 
LEFT JOIN
exhibit AS e
ON c.car_id = e.car_id


SELECT * 
FROM 
exhibit AS e 
LEFT JOIN 
car AS c 
ON e.car_id = c.car_id 
LEFT JOIN 
car_type AS ct 
ON e.car_type_id = ct.car_type_id 
WHERE 
car_id = 1 AND 
car_type_id = 6 AND 
maker_id = 2 AND 
ct.name LIKE '%ア%' AND 
c.mileage BETWEEN 0 AND 100000 AND 
c.color = 100 AND 
c.automatic_or_mission = 1 AND 
c.number_of_passengers = 4




IO
(PWM)パルスワイズモジュレーション
GPIO12(PWM0)ポートを使用する

入力 = スイッチ
出力 = ブザー
納期：年明け

後期評定課題
好きなものを作る
年明け(18日に)前で実演