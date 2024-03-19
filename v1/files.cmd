@echo off
dir
fsutil file createnew css\style.css 0
fsutil file createnew js\main.js 0
fsutil file createnew js\main.tsx 0
cd pages
mkdir css
mkdir img
mkdir js
fsutil file createnew css\style.css 0
fsutil file createnew js\main.js 0
fsutil file createnew js\main.tsx 0
fsutil file createnew downloads.html 0
fsutil file createnew youtube.html 0
mkdir download
mkdir download\css
mkdir download\js
fsutil file createnew download\css\style.css 0
fsutil file createnew download\js\main.js 0
fsutil file createnew download\js\main.tsx 0
fsutil file createnew download\osbake.html 0
fsutil file createnew download\addplayersmc.html 0
fsutil file createnew download\webview2browser.html 0
fsutil file createnew download\awnprank.html 0
cd ..

