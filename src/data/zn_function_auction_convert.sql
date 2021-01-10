set global log_bin_trust_function_creators = 1;
----
DROP FUNCTION IF EXISTS zn_auction_convert_product_type;
CREATE FUNCTION zn_auction_convert_product_type($id int(11))
RETURNS VARCHAR(50)
BEGIN
DECLARE _temp varchar(50);
select zn_title INTO _temp from zn_auction_product_type where id=IFNULL($id, 0);
RETURN _temp;
END
