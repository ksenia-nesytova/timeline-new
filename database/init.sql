-- public.actor_types definition

-- Drop table

-- DROP TABLE public.actor_types;

CREATE TABLE IF NOT EXISTS public.actor_types (
	id serial4 NOT NULL,
	type_name text NOT NULL,
	parent_type int4 NULL,
	CONSTRAINT actor_types_pk PRIMARY KEY (id),
	CONSTRAINT actor_types_unique UNIQUE (id)
);


-- public.entities definition

-- Drop table

-- DROP TABLE public.entities;

CREATE TABLE IF NOT EXISTS public.entities (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	description text NULL,
	start_date timestamp NULL,
	end_date timestamp NULL,
	start_date_precision int4 NULL,
	end_date_precision int4 NULL,
	CONSTRAINT entities_pkey PRIMARY KEY (id)
);


-- public.event_types definition

-- Drop table

-- DROP TABLE public.event_types;

CREATE TABLE IF NOT EXISTS public.event_types (
	id serial4 NOT NULL,
	type_name text NOT NULL,
	parent_type int4 NULL,
	CONSTRAINT event_types_pk PRIMARY KEY (id)
);


-- public.item_statuses definition

-- Drop table

-- DROP TABLE public.item_statuses;

CREATE TABLE IF NOT EXISTS public.item_statuses (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT item_statuses_pk PRIMARY KEY (id)
);


-- public.item_types definition

-- Drop table

-- DROP TABLE public.item_types;

CREATE TABLE IF NOT EXISTS public.item_types (
	type_name text NOT NULL,
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	parent_type int4 NULL,
	CONSTRAINT item_types_pk PRIMARY KEY (id)
);


-- public.actors definition

-- Drop table

-- DROP TABLE IF EXISTS public.actors CASCADE;

CREATE TABLE IF NOT EXISTS public.actors (
	id serial4 NOT NULL,
	entity_id int4 NOT NULL,
	actor_type int4 NULL,
	CONSTRAINT actors_pk PRIMARY KEY (id),
	CONSTRAINT actors_actor_types_fk FOREIGN KEY (actor_type) REFERENCES public.actor_types(id),
	CONSTRAINT actors_entities_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);


-- public.institutions definition

-- Drop table

-- DROP TABLE public.institutions;

CREATE TABLE IF NOT EXISTS public.institutions (
	id serial4 NOT NULL,
	founder int4 NULL,
	actor_type_id int4 NULL,
	actor_id int4 NOT NULL,
	CONSTRAINT institutions_pk PRIMARY KEY (id),
	CONSTRAINT institutions_actor_types_fk FOREIGN KEY (actor_type_id) REFERENCES public.actor_types(id),
	CONSTRAINT institutions_actors_fk FOREIGN KEY (actor_id) REFERENCES public.actors(id)
);


-- public.items definition

-- Drop table

-- DROP TABLE public.items;

CREATE TABLE IF NOT EXISTS public.items (
	status_id int4 NOT NULL,
	id serial4 NOT NULL,
	"name" text NOT NULL,
	item_type_id int4 NOT NULL,
	entity_id int4 NOT NULL,
	CONSTRAINT items_pk PRIMARY KEY (id),
	CONSTRAINT items_entities_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id),
	CONSTRAINT items_item_statuses_fk FOREIGN KEY (status_id) REFERENCES public.item_statuses(id),
	CONSTRAINT items_item_types_fk FOREIGN KEY (item_type_id) REFERENCES public.item_types(id)
);


-- public.locations definition

-- Drop table

-- DROP TABLE public.locations;

CREATE TABLE IF NOT EXISTS public.locations (
	coordinates point NULL,
	id serial4 NOT NULL,
	entity_id int4 NOT NULL,
	CONSTRAINT locations_pk PRIMARY KEY (id),
	CONSTRAINT locations_entities_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);


-- public.periods definition

-- Drop table

-- DROP TABLE public.periods;

CREATE TABLE IF NOT EXISTS public.periods (
	id serial4 NOT NULL,
	entity_id int4 NOT NULL,
	parent_period int4 NULL,
	CONSTRAINT periods_pk PRIMARY KEY (id),
	CONSTRAINT periods_entities_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id),
	CONSTRAINT periods_periods_fk FOREIGN KEY (parent_period) REFERENCES public.periods(id)
);


-- public.events definition

-- Drop table

-- DROP TABLE public.events;

CREATE TABLE IF NOT EXISTS public.events (
	persons int4 NULL,
	items int4 NULL,
	locations int4 NULL,
	id serial4 NOT NULL,
	entity_id int4 NOT NULL,
	"period" int4 NULL,
	event_type_id int4 NOT NULL,
	parent_event_id int4 NULL,
	CONSTRAINT events_pk PRIMARY KEY (id),
	CONSTRAINT events_actors_fk FOREIGN KEY (persons) REFERENCES public.actors(id),
	CONSTRAINT events_entities_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id),
	CONSTRAINT events_event_types_fk FOREIGN KEY (event_type_id) REFERENCES public.event_types(id),
	CONSTRAINT events_items_fk FOREIGN KEY (items) REFERENCES public.items(id),
	CONSTRAINT events_locations_fk FOREIGN KEY (locations) REFERENCES public.locations(id),
	CONSTRAINT events_periods_fk FOREIGN KEY ("period") REFERENCES public.periods(id)
);


-- public.item_owner definition

-- Drop table

-- DROP TABLE public.item_owner;

CREATE TABLE IF NOT EXISTS public.item_owner (
	actor_id int4 NOT NULL,
	item_id int4 NOT NULL,
	CONSTRAINT item_actor_pk PRIMARY KEY (item_id),
	CONSTRAINT item_owner_actors_fk FOREIGN KEY (actor_id) REFERENCES public.actors(id),
	CONSTRAINT item_owner_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id),
	CONSTRAINT item_owner_locations_fk FOREIGN KEY (actor_id) REFERENCES public.locations(id)
);

INSERT INTO public.entities
("name", description, start_date, end_date, start_date_precision, end_date_precision)
VALUES('Столетняя война', '', NULL, NULL, NULL, NULL);
INSERT INTO public.entities
("name", description, start_date, end_date, start_date_precision, end_date_precision)
VALUES('Эдуард III', '', NULL, NULL, NULL, NULL);
INSERT INTO public.entities
("name", description, start_date, end_date, start_date_precision, end_date_precision)
VALUES('Черная смерть', '', NULL, NULL, NULL, NULL);


INSERT INTO public.actors (entity_id) VALUES
	 (2);
