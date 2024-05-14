CREATE OR REPLACE VIEW "tasks"."task_view" AS
    SELECT *,
    	(
    		SELECT concat_ws(' ', tt."name", tt."number"::text, tt."description", c."text", e."text") 
    		FROM "tasks"."task" tt
    		LEFT JOIN (
				SELECT cc."task_id", string_agg(cc."text", ' ') AS "text"
				FROM "tasks"."task_comment" cc
				GROUP BY cc."task_id"
			) AS c ON c."task_id" = tt."id"
			LEFT JOIN (
				SELECT ee."task_id", string_agg(ee."description", ' ') AS "text"
				FROM "tasks"."task_effort" ee
				GROUP BY ee."task_id"
			) AS e ON e."task_id" = tt."id"
    		WHERE tt."id" = t."id"
    	) AS "fulltext",
    	(
    		SELECT sum(e."value")
    		FROM "tasks"."task_effort" e
    		WHERE e."task_id" = t."id" 
    	) AS "total_efforts"
    FROM "tasks"."task" t;