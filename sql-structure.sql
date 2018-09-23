/*
 Navicat Premium Data Transfer

 Source Server         : YT Playlist Backup
 Source Server Type    : PostgreSQL
 Source Server Version : 100005
 Source Host           : localhost:5432
 Source Catalog        : playlist-backup
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100005
 File Encoding         : 65001

 Date: 23/09/2018 14:55:32
*/


-- ----------------------------
-- Table structure for channels
-- ----------------------------
DROP TABLE IF EXISTS "public"."channels";
CREATE TABLE "public"."channels" (
  "id" varchar(24) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "avatar" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "user" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "channelUrl" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "userUrl" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "verified" bool DEFAULT false,
  "createdAt" timestamp(0) DEFAULT NULL::timestamp without time zone,
  "updatedAt" timestamp(0) DEFAULT NULL::timestamp without time zone
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" varchar(22) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "secret" varchar(32) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "createdAt" timestamp(0) DEFAULT NULL,
  "updatedAt" timestamp(0) DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for users_videos
-- ----------------------------
DROP TABLE IF EXISTS "public"."users_videos";
CREATE TABLE "public"."users_videos" (
  "users_id" varchar(22) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "videos_id" varchar(11) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "createdAt" timestamp(0) DEFAULT NULL::timestamp without time zone,
  "updatedAt" timestamp(0) DEFAULT NULL::timestamp without time zone
)
;

-- ----------------------------
-- Table structure for videos
-- ----------------------------
DROP TABLE IF EXISTS "public"."videos";
CREATE TABLE "public"."videos" (
  "id" varchar(11) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "lengthSeconds" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "channelId" varchar(24) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "viewCount" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "author" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "description" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "rating" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "thumbnailUrl" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "createdAt" timestamp(0) DEFAULT NULL,
  "updatedAt" timestamp(0) DEFAULT NULL,
  "isLiveContent" bool DEFAULT false,
  "published" timestamp(0) DEFAULT NULL
)
;

-- ----------------------------
-- Primary Key structure for table channels
-- ----------------------------
ALTER TABLE "public"."channels" ADD CONSTRAINT "channel_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "id" UNIQUE ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users_videos
-- ----------------------------
ALTER TABLE "public"."users_videos" ADD CONSTRAINT "user_video_pkey" PRIMARY KEY ("users_id", "videos_id");

-- ----------------------------
-- Primary Key structure for table videos
-- ----------------------------
ALTER TABLE "public"."videos" ADD CONSTRAINT "video_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table users_videos
-- ----------------------------
ALTER TABLE "public"."users_videos" ADD CONSTRAINT "fk_users" FOREIGN KEY ("users_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."users_videos" ADD CONSTRAINT "fk_videos" FOREIGN KEY ("videos_id") REFERENCES "videos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table videos
-- ----------------------------
ALTER TABLE "public"."videos" ADD CONSTRAINT "fk_channelId" FOREIGN KEY ("channelId") REFERENCES "channels" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
