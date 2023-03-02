SELECT `event`.`id`, `event`.`name`, `event`.`description`, `event`.`due_date`, `category`.`id` AS `category.id`, `category`.`name` AS `category.name`, `category`.`type` AS `category.type`, `category`.`T1` AS `category.T1`, `category`.`T2` AS `category.T2`, `category`.`T3` AS `category.T3` FROM `event` AS `event` LEFT OUTER JOIN `category` AS `category` ON `event`.`category_id` = `category`.`id`