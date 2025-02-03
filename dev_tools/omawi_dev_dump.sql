-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: omawi_dev_db
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `composers`
--

DROP TABLE IF EXISTS `composers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composers` (
  `name` varchar(45) NOT NULL,
  `id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composers`
--

LOCK TABLES `composers` WRITE;
/*!40000 ALTER TABLE `composers` DISABLE KEYS */;
INSERT INTO `composers` VALUES ('Ludwig van Beethoven','073c16c1-a916-4517-9f4b-5eb16ee76983','2025-01-23 14:52:53','2025-01-23 14:52:53'),('William Henry Monk','21a38dd6-1082-402b-a284-644ca5e407d8','2025-01-23 14:52:53','2025-01-23 14:52:53'),('Franz Xaver Gruber','c763b6fa-feee-4d6c-a134-47adca9e8fe2','2025-01-23 14:52:53','2025-01-23 14:52:53'),('Johannes Daniel Falk','ea94a113-6e3a-46f2-bd69-12e307c888a5','2025-01-23 14:52:53','2025-01-23 14:52:53');
/*!40000 ALTER TABLE `composers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `melodies`
--

DROP TABLE IF EXISTS `melodies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `melodies` (
  `filepath` varchar(256) NOT NULL,
  `composer_id` varchar(45) DEFAULT NULL,
  `id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filepath` (`filepath`),
  KEY `composer_id` (`composer_id`),
  CONSTRAINT `melodies_ibfk_1` FOREIGN KEY (`composer_id`) REFERENCES `composers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `melodies`
--

LOCK TABLES `melodies` WRITE;
/*!40000 ALTER TABLE `melodies` DISABLE KEYS */;
INSERT INTO `melodies` VALUES ('silent_night','c763b6fa-feee-4d6c-a134-47adca9e8fe2','3895d005-fc1e-474f-acb8-8cd6be8e6daf','2025-01-23 14:55:58','2025-01-23 14:55:58'),('tutu_gbovi',NULL,'5489c5ca-8bd4-45bf-86c4-797ba28f6029','2025-01-23 15:04:36','2025-01-23 15:04:36'),('eventide','21a38dd6-1082-402b-a284-644ca5e407d8','77af4e67-eebe-46dc-a906-4f31ed881749','2025-01-23 14:55:58','2025-01-23 14:55:58'),('mawawa',NULL,'7ae680fe-a327-4c12-822f-0efa69ec1250','2025-01-23 15:04:36','2025-01-23 15:04:36'),('o_sanctissima','073c16c1-a916-4517-9f4b-5eb16ee76983','ab896d2b-2d27-497a-9421-95e868df1041','2025-01-23 14:55:58','2025-01-23 14:55:58'),('taamba_ndje',NULL,'ed48d774-3946-409c-bc34-711635d00d74','2025-01-23 15:04:36','2025-01-23 15:04:36'),('egumbo',NULL,'feb35885-c6da-4ea2-a9af-4dcb0320f5bb','2025-01-23 15:04:36','2025-01-23 15:04:36');
/*!40000 ALTER TABLE `melodies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_melody_assoc_table`
--

DROP TABLE IF EXISTS `song_melody_assoc_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_melody_assoc_table` (
  `song_id` varchar(45) NOT NULL,
  `melody_id` varchar(45) NOT NULL,
  PRIMARY KEY (`song_id`,`melody_id`),
  KEY `melody_id` (`melody_id`),
  CONSTRAINT `song_melody_assoc_table_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  CONSTRAINT `song_melody_assoc_table_ibfk_2` FOREIGN KEY (`melody_id`) REFERENCES `melodies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_melody_assoc_table`
--

LOCK TABLES `song_melody_assoc_table` WRITE;
/*!40000 ALTER TABLE `song_melody_assoc_table` DISABLE KEYS */;
INSERT INTO `song_melody_assoc_table` VALUES ('7a1fc990-195d-4b15-83c6-13728a5a8665','3895d005-fc1e-474f-acb8-8cd6be8e6daf'),('3b1d66af-966d-4370-a302-69128ecce545','5489c5ca-8bd4-45bf-86c4-797ba28f6029'),('62eaa638-903e-4bb1-832a-2e3a204339ef','77af4e67-eebe-46dc-a906-4f31ed881749'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2','77af4e67-eebe-46dc-a906-4f31ed881749'),('de289192-9c3c-4229-b868-4422586e0943','7ae680fe-a327-4c12-822f-0efa69ec1250');
/*!40000 ALTER TABLE `song_melody_assoc_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `title` varchar(45) NOT NULL,
  `number` int DEFAULT NULL,
  `id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES ('Tutu Gbovi',NULL,'3b1d66af-966d-4370-a302-69128ecce545','2025-01-23 15:35:47','2025-01-23 15:35:47'),('Kala Pu Ngaye Uusiku',641,'62eaa638-903e-4bb1-832a-2e3a204339ef','2025-01-23 15:30:33','2025-01-23 15:30:33'),('Jesus Jesus Taamba Ndje',NULL,'6c16a533-0acd-474b-a899-828f86b3c28c','2025-01-23 15:33:09','2025-01-23 15:33:09'),('Silent Night',34,'7a1fc990-195d-4b15-83c6-13728a5a8665','2025-01-23 15:30:33','2025-02-03 15:15:11'),('O Du Fröhliche',NULL,'a33c39c4-a93a-483f-a169-71c3ccf37716','2025-01-23 15:33:09','2025-01-23 15:33:09'),('Nyakukweni Nye',33,'ad3dca7f-a451-4624-991f-e413c06fd7d4','2025-01-23 15:30:33','2025-01-23 15:30:33'),('Abide With Me',NULL,'b9680de1-3e95-48e4-92eb-0d1e68bc3ca2','2025-01-23 15:33:09','2025-02-03 16:36:41'),('Mawawa',632,'de289192-9c3c-4229-b868-4422586e0943','2025-01-23 15:30:33','2025-01-23 15:30:33'),('Egumbo Nande Ehepele',544,'e82cfbed-84f4-430f-90ce-ab3676783caf','2025-01-23 15:30:33','2025-01-23 15:30:33');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Tots','tots@mail.com','scrypt:32768:8:1$iBT9wOmQ5gL1SMrp$99d040f433f2ec3b0e983c35ef831b1d894df980e215c6c1ab7b7e12fbf826d897fc7d182e33790bc617c31c16b13c55fa137ef25f43792e97a1d51a336c8ab3','efa5dc0b-5c32-4044-9544-975f0c37088f','2025-01-23 19:44:07','2025-01-23 19:44:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verses`
--

DROP TABLE IF EXISTS `verses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verses` (
  `song_id` varchar(45) NOT NULL,
  `number` int NOT NULL,
  `lyrics` varchar(1028) NOT NULL,
  `id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `verses_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verses`
--

LOCK TABLES `verses` WRITE;
/*!40000 ALTER TABLE `verses` DISABLE KEYS */;
INSERT INTO `verses` VALUES ('ad3dca7f-a451-4624-991f-e413c06fd7d4',1,'Nyakukweni, nye. Hafeleni nee.\nFiku eli laKrismesa!\nJesus a dalwa, Twa li twa kana.\nHafa, hafa, mukriste, nyakukwa.','03a18448-17ae-4885-81b7-c9b2ce32ac6f','2025-01-23 16:00:16','2025-01-23 16:00:16'),('ad3dca7f-a451-4624-991f-e413c06fd7d4',3,'Nyakukweni, nye. Hafeleni nee.\nFiku eli laKrismesa!\nUlu_ove, mu yamba, Imbila Hamba!\nHafa, hafa, mukriste, nyakukwa.','14579ff5-8e95-4139-953d-f31d5c602492','2025-01-23 16:09:03','2025-01-23 16:09:03'),('de289192-9c3c-4229-b868-4422586e0943',3,'Mayonagulo gandje, Agehe dhima po.\nYapul\' oondunge dhandje. Nehalo lyandje wo.\nTs\' aashona wo naanene, Atuhe sikila.\nTugamena kiiponga, Uusiku mbu we ya.','1748f740-5067-4983-bba0-691a250750d7','2025-01-23 16:09:03','2025-01-23 16:09:03'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2',5,'Hold thou thy cross before my closing eyes.\nShine through the gloom and point me to the skies.\nHeaven\'s morning breaks and earth\'s vain shadows flee;\nin life, in death, O Lord, abide with me.','2dabf3b3-179e-4c91-ad89-504484264a05','2025-01-26 08:23:01','2025-01-26 08:23:01'),('a33c39c4-a93a-483f-a169-71c3ccf37716',3,'O du fröhliche, o du selige\nGnadenbringende Weihnachtszeit!\nHimmlische Heere jauchzen dir Ehre:\nFreue, freue dich, o Christenheit!','3273b459-17d0-4725-bdfa-f2efc91be9e6','2025-02-03 12:10:11','2025-02-03 12:10:11'),('a33c39c4-a93a-483f-a169-71c3ccf37716',1,'O du fröhliche, o du selige\nGnadenbringende Weihnachtszeit!\nWelt ging verloren, Christ ist geboren\nFreue, freue dich, o Christenheit!','3f8ddc9b-1382-468f-98c9-9bb9acaec2a9','2025-02-03 12:10:11','2025-02-03 12:10:11'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2',4,'I fear no foe with thee at hand to bless,\nills have no weight, and tears no bitterness.\nWhere is death\'s sting? Where, grave, thy victory?\nI triumph still, if thou abide with me.','420b063e-ad16-496c-a980-9714795e0198','2025-01-26 08:23:01','2025-01-26 08:23:01'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2',3,'I need thy presence every passing hour.\nWhat but thy grace can foil the tempter\'s power?\nWho like thyself my guide and strength can be?\nThrough cloud and sunshine, O abide with me.','43e7c67e-4d34-4087-aff2-d4686909191e','2025-01-26 08:23:01','2025-01-26 08:23:01'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2',1,'Abide with me: fast falls the eventide;\nthe darkness deepens; Lord, with me abide.\nWhen other helpers fail and comforts flee,\nHelp of the helpless, O abide with me.','6ef44067-3edd-4f48-b04c-c90e93209c07','2025-01-26 08:23:01','2025-01-26 08:23:01'),('b9680de1-3e95-48e4-92eb-0d1e68bc3ca2',2,'Swift to its close ebbs out life\'s little day;\nearth\'s joys grow dim, its glories pass away.\nChange and decay in all around I see.\nO thou who changest not, abide with me.','715b34c1-29d3-482f-8d13-17fd541d29a0','2025-01-26 08:23:01','2025-01-26 08:23:01'),('a33c39c4-a93a-483f-a169-71c3ccf37716',2,'O du fröhliche, o du selige\nGnadenbringende Weihnachtszeit!\nChrist ist erschienen, uns zu versühnen\nFreue, freue dich, o Christenheit!','84441e81-fcbd-4fca-8146-73c6eeffa25e','2025-02-03 12:10:11','2025-02-03 12:10:11'),('3b1d66af-966d-4370-a302-69128ecce545',1,'Tutu gbovi, Tutu gbovi\nTata mu le anuea mewo\nDada mu le anuea mewo\nAoh djedje vinye bonu bonu kpo\n\nMe keye poa ma\nPauluvi\nTutan ne ma poe nawo\n\nMe keye poa ma\nPauluvi ya\nTutan ne ma poe nawo\nAoh djedje vinye bonu bonu kpo.','90abc28b-b438-4963-8244-8526e80ae864','2025-01-23 16:00:16','2025-01-23 16:00:16'),('62eaa638-903e-4bb1-832a-2e3a204339ef',4,'Nomushigakano minikila ndje,\nMeso nge ngame tandi ningine;\nNdaa n\' omilema, shaa tuu ndi ku na,\nNge ndi n\' omwenyo nenge mokusa.','91657a5e-b4a0-4ba5-b876-0c7800d89db2','2025-01-23 16:00:16','2025-01-23 16:00:16'),('ad3dca7f-a451-4624-991f-e413c06fd7d4',2,'Nyakukweni, nye. Hafeleni nee.\nFiku eli laKrismesa!\nKristus w uya, Mupopil\' e uya:\nHafa, hafa, mukriste, nyakukwa.','b3b6a173-7e69-4966-931d-a342a14b4429','2025-01-23 16:09:03','2025-01-23 16:09:03'),('de289192-9c3c-4229-b868-4422586e0943',2,'Ondi li mpa pungoye, U minikile nde.\nKekumagidho lyoye, U vulikithe ndje.\nEsiku kehe, Omuwa, U watele ndje wo.\nMokati kaana yaantu, Miilongayakulo.','b447a57e-b07e-41f3-8d0f-fcc95311012c','2025-01-23 16:09:03','2025-01-23 16:09:03'),('62eaa638-903e-4bb1-832a-2e3a204339ef',2,'Masiku gandje taga hulu po,\nNyanyu lyuuyuni omuzimzimba wo.\nShoka sha kola muka, kashi mo.\nJesus awike oho kala po.','b52fffd9-a823-4e93-bf05-8e8c2630f908','2025-01-23 16:00:16','2025-01-23 16:00:16'),('62eaa638-903e-4bb1-832a-2e3a204339ef',3,'Iihundjunina ho yi yono po,\nNosho ho mweneke mayemato.\nSindano eso kali li na we.\nJesus ha gamene ndje, ngame gwe.','c6755cca-3fdc-45bb-a2c9-ed08b0aa844b','2025-01-23 16:00:16','2025-01-23 16:00:16'),('de289192-9c3c-4229-b868-4422586e0943',1,'Mawawa, Jesus, goye, Ga yelulithila ndje.\nNdi ye meshigo lyoye, Shampoka ndi li po.\nPungoy\' enyanyu kehe, Oli n\' eyapulo.\nPungoye omahodhi, Otaga thetwa po','e434dac6-a716-4fae-90f8-0c6124ecdb89','2025-01-23 16:00:16','2025-01-23 16:00:16'),('62eaa638-903e-4bb1-832a-2e3a204339ef',1,'Kala pungay\' uusiku sho weya.\nTango lya toko nolya ningina.\nOlye  tuu ngo ta hepulutha ndje,\nOlye uuyina te u kutha ndje?','f71a5c41-4608-41e3-b142-722c7615dd0a','2025-01-23 16:00:16','2025-01-23 16:00:16');
/*!40000 ALTER TABLE `verses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-03 16:38:42
