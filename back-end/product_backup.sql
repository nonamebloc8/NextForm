--
-- PostgreSQL database dump
--

\restrict zNncJDnnrSqnFInPVuwsDBHgtD00Le28mon3inlHvgF9F3O8PD7ABiKLyVYjoq2

-- Dumped from database version 14.19 (Ubuntu 14.19-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.19 (Ubuntu 14.19-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: noname
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    "imageUrl" text,
    stock integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Product" OWNER TO noname;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: noname
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO noname;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: noname
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: noname
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: noname
--

COPY public."Product" (id, name, description, price, "imageUrl", stock, "createdAt") FROM stdin;
1	Wegovy 0.25mg	Solution injectable pour la gestion du poids chronique. Aide à la réduction de l'appétit et à l'augmentation de la perte de poids.	130	/uploads/products/wegovy-obesite-2744.jpeg	0	2025-11-29 23:31:28.18
2	Wegovy 0.5mg	Solution injectable pour la gestion du poids chronique. Aide à la réduction de l'appétit et à l'augmentation de la perte de poids.	170	/uploads/products/w5.jpeg	0	2025-11-29 23:32:28.73
3	Wegovy 1mg	Solution injectable pour la gestion du poids chronique. Aide à la réduction de l'appétit et à l'augmentation de la perte de poids.	210	/uploads/products/w1.jpeg	0	2025-11-29 23:33:56.716
4	Wegovy 1.7mg	Solution injectable pour la gestion du poids chronique. Aide à la réduction de l'appétit et à l'augmentation de la perte de poids.	230	/uploads/products/w1.jpeg	0	2025-11-29 23:34:26.879
5	Wegovy 2,4mg	Solution injectable pour la gestion du poids chronique. Aide à la réduction de l'appétit et à l'augmentation de la perte de poids.	230	/uploads/products/w2.jpeg	0	2025-11-29 23:35:18.69
6	Mounjaro 2.5mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	173	/uploads/mounjaro.jpeg	0	2025-11-29 23:48:30.911
7	Mounjaro 5mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	210	/uploads/m5.jpeg	0	2025-11-29 23:49:33.989
8	Mounjaro 7.5mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	240	/uploads/m7.jpeg	0	2025-11-29 23:50:31.562
11	Mounjaro 10mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	310	/uploads/m10.jpeg	0	2025-11-29 23:57:00.295
12	Mounjaro 12.5mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	370	/uploads/products/m12.jpeg	0	2025-11-29 23:59:28.83
13	Mounjaro 15mg	Solution injectable pour le traitement du diabète de type 2 et la gestion du poids. Améliore le contrôle glycémique.	405	/uploads/products/m15.jpeg	0	2025-11-30 00:01:41.197
14	Ozempic 0.25mg	Médicament pour le traitement du diabète de type 2, également utilisé pour la perte de poids chez certains	135	/uploads/products/o0.jpeg	0	2025-11-30 00:04:35.933
15	Ozempic 0.5mg	Médicament pour le traitement du diabète de type 2, également utilisé pour la perte de poids chez certains	170	/uploads/products/o5.jpeg	0	2025-11-30 00:05:51.88
16	Ozempic 1mg	Médicament pour le traitement du diabète de type 2, également utilisé pour la perte de poids chez certains	210	/uploads/products/o1.jpeg	0	2025-11-30 00:06:56.705
17	Ozempic 2mg	Médicament pour le traitement du diabète de type 2, également utilisé pour la perte de poids chez certains	290	/uploads/products/pharma.jpeg	0	2025-11-30 00:08:39.618
18	Saxenda 6mg	Indiqué pour la gestion du poids chez les adultes en surpoids ou obèses ayant au moins une comorbidité liée au poids.	210	/uploads/products/saxenda.jpeg	0	2025-11-30 00:10:54.631
19	Gélules de Glucides Contrôlés	Complément alimentaire pour aider à réduire l'absorption des glucides, supportant ainsi la gestion du poids.	15	/uploads/products/Selection (1).jpeg	0	2025-11-30 00:13:07.788
20	Protéines Végétales Bio	Poudre de protéines végétales bio pour soutenir la masse musculaire pendant la perte de poids. Goût vanille.	20	/uploads/products/Selection (2) (1).jpeg	0	2025-11-30 00:14:39.935
21	Guide Nutritionnel Complet	Un guide détaillé avec des plans de repas et des conseils pour une perte de poids saine et durable.	30	/uploads/products/Selection (4) (1).jpeg	0	2025-11-30 00:16:06.033
22	Bandes de Résistance Fitness	Ensemble de 5 bandes de résistance pour des entraînements efficaces à la maison ou en déplacement.	30	/uploads/products/Selection (5) (1).jpeg	0	2025-11-30 00:17:25.102
23	Glucomètre Connecté	Appareil compact pour le suivi de la glycémie, avec synchronisation facile des données via application mobile.	20	/uploads/products/Selection (3) (1).jpeg	0	2025-11-30 00:18:41.359
24	Application de Suivi de Poids Premium	Abonnement d'un an à notre application pour un suivi personnalisé du poids, de l'alimentation et de l'exercice.	40	/uploads/products/Selection (3) (1).jpeg	0	2025-11-30 00:21:05.435
25	Consultation Diététique Vidéo	Séance individuelle de 30 minutes avec un diététicien qualifié pour des conseils personnalisés.	50	/uploads/products/video.jpeg	0	2025-11-30 00:22:53.972
26	Thé Minceur Detox Bio	Mélange de plantes biologiques pour une aide naturelle à la détoxification et à la perte de poids.	15	/uploads/products/Selection (8) (1).jpeg	0	2025-11-30 00:24:10.464
\.


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: noname
--

SELECT pg_catalog.setval('public."Product_id_seq"', 26, true);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: noname
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: noname
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- PostgreSQL database dump complete
--

\unrestrict zNncJDnnrSqnFInPVuwsDBHgtD00Le28mon3inlHvgF9F3O8PD7ABiKLyVYjoq2

