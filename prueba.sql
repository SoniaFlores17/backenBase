-- MariaDB dump 10.19  Distrib 10.11.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.11.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jugables`
--

DROP TABLE IF EXISTS `jugables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jugables` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Elementos` varchar(255) NOT NULL,
  `Arma` varchar(50) NOT NULL,
  `Rareza` int(1) NOT NULL,
  `Region` varchar(255) NOT NULL,
  `Habilidades_Pasivas` varchar(255) NOT NULL,
  `Rol_equipo` varchar(50) NOT NULL,
  `Constelacion` varchar(100) NOT NULL,
  `Ataque` varchar(50) NOT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugables`
--

LOCK TABLES `jugables` WRITE;
/*!40000 ALTER TABLE `jugables` DISABLE KEYS */;
INSERT INTO `jugables` VALUES
(1,'Albedo','Geo','Espada Ligera',5,'Mondstadt','Fuerza caliza, Sabiduría del homúnculo, Genio de la alquimia','DPS y Soporte','Flor del Edén, Eón Fanerozoico, Gracia de Helios','Normal','S','2022-11-11 16:57:34','2022-11-15 22:51:46'),
(2,'prueba','pruebas','espada',5,'Sur','Correr','tres','pruebass','normal','S','2022-11-15 18:52:08','2022-11-15 22:51:59'),
(3,'prueba2','pruebas','espada',5,'Sur','Correr','tres','pruebass','normal','N','2022-11-15 22:03:58','2022-11-15 22:52:20'),
(4,'Hydro','Hydro','Catalizador',4,'Mondstadt','Estacion gloriosa, Bis, Con todo mi corazon','Sanadora','Balada alegre, Explocion de vitalidad','normal','N','2022-11-16 16:17:25','2022-11-16 16:21:13'),
(5,'Hydros','Hydro','Catalizador',4,'Mondstadt','Estacion gloriosa, Bis, Con todo mi corazon','Sanadora','Balada alegre, Explocion de vitalidad','normal','S','2022-11-16 16:20:46','2022-11-16 16:20:46');
/*!40000 ALTER TABLE `jugables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES
(1,'erikazg@gmail.com','Erika','Zarate Gutierres',21,'F','erika','1900-01-01','N','2022-10-12 15:21:39','2022-10-27 15:57:10'),
(2,'soniafz@gmail.com','Sonia','Flores Zuniga',22,'F','sonia','2000-09-17','S','2022-10-12 15:21:39','2022-10-12 15:21:39'),
(3,'erika.zara','Erika','Zarate',20,'F','erika','2002-11-03','S','2022-10-25 15:58:10','2022-10-25 15:58:10'),
(4,'zahid14','Erika','Zarate',20,'','erika','2000-01-01','S','2022-10-26 15:49:32','2022-10-26 15:49:32'),
(5,'bob.p@springfield.com','Bob','Patiños',13,'','$2a$10$7ksD0GfojBU0cinjsrGGreTb2DkcKyDNo2v/nmQVPPs5ldXAgegJW','2000-01-01','S','2022-10-28 15:36:46','2022-10-28 15:36:46'),
(6,'patricio.p@springfield.com','Patricio','Estrella',50,'','$2a$10$kJLi6vJnHZG6BPXIhdJLSOgRUA6dNGszBSLwPtX6pV6Ey9g/5BnjW','2000-01-01','S','2022-10-28 15:40:08','2022-11-03 16:49:58');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 10:41:22
