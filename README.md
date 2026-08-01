# 🚀 LDCode Technology Website

เว็บไซต์หลักสำหรับสตูดิโอและเอเจนซี่ **LDCode** พัฒนาขึ้นด้วยสถาปัตยกรรมยุคใหม่ที่รองรับการทำ SEO สมบูรณ์แบบ มีดีไซน์พรีเมียม โหลดเร็ว และปลอดภัยสูงโดยไม่มีการเชื่อมต่อกับเซิร์ฟเวอร์ฐานข้อมูลหลังบ้าน (100% Backend-Free / Static Site Generation)

---

## ✨ Features (คุณสมบัติเด่น)

*   **100% Backend-Free & SSG**: หน้าเพจทั้งหมด (รวมถึงหน้ารายละเอียดบริการและบล็อก) ถูกบิลด์ล่วงหน้าเป็นสแตติก HTML ปลอดภัยจากการโจมตี มั่นใจได้เรื่องค่าโฮสติ้งที่เป็น 0 บาท
*   **Bilingual Translation System**: รองรับสองภาษา (ภาษาไทย / English) ด้วย Language Context ควบคุมการสลับภาษาได้อย่างราบรื่น
*   **Dynamic Budget Estimator**: เครื่องคำนวณงบประมาณออนไลน์แบบโต้ตอบได้ในหน้าคำนวณราคา พร้อมลิงก์ส่งข้อมูลอัตโนมัติไปยังฟอร์มติดต่อ
*   **Dynamic Blog System**: ระบบบทความข่าวสารเทคโนโลยี แยกแสดงตามหมวดหมู่และค้นหาได้ลื่นไหลด้วย Framer Motion
*   **Premium Floating LINE Chat**: ปุ่มติดต่อ LINE ลอยตัวพร้อมตัวระบุสถานะเคลื่อนไหวและกล่องข้อความช่วยเหลือสองภาษา
*   **Pro SEO & Security Optimized**:
    *   สร้างไฟล์ `sitemap.xml` และ `robots.txt` แบบไดนามิกตามข้อมูลบริการและบทความ
    *   ฝังโครงสร้างข้อมูล Rich Snippets ด้วย JSON-LD (`Organization` & `ProfessionalService`)
    *   ตั้งค่าความปลอดภัย HTTP Headers (XSS, HSTS, Clickjacking protection) ผ่าน `next.config.ts`

---

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)

*   **Framework**: Next.js 16 (App Router)
*   **Logic & Rendering**: React, TypeScript, Framer Motion (Animations)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Form Dispatcher**: Web3Forms API (Serverless Mail Client)

---

## 📂 Project Structure (โครงสร้างโฟลเดอร์ที่สำคัญ)

```text
├── app/                  # หน้าเพจหลักและ Routing (Next.js App Router)
│   ├── blog/             # ระบบบทความบล็อก
│   ├── services/         # ระบบข้อมูลขอบเขตบริการ
│   ├── portfolio/        # หน้าแสดงกรณีศึกษาผลงาน
│   ├── pricing/          # หน้าเครื่องมือคำนวณราคา
│   ├── sitemap.ts        # ตัวสร้าง Sitemap.xml
│   └── layout.tsx        # เลย์เอาต์หลักของแอปพลิเคชัน
├── components/           # UI Components แยกส่วน
│   ├── home/             # Component หน้าแรก
│   ├── layout/           # ส่วนควบคุมร่วม (Navbar, Footer, Floating LINE)
│   └── seo/              # ระบบสร้าง JSON-LD Schema
├── data/                 # แหล่งจัดเก็บข้อมูลสแตติกดาต้า (JSON)
│   ├── blog.json         # ข้อมูลไฟล์บทความทั้งหมด
│   ├── services.json     # รายละเอียดประเภทบริการรับทำเว็บ
│   ├── projects.json     # คลังผลงาน/กรณีศึกษาลูกค้า
│   └── company.json      # ข้อมูลสถิติ เบอร์โทร และโซเชียลบริษัท
```

---

## 🚀 Getting Started (วิธีการเปิดใช้งานโปรเจกต์)

### 1. ติดตั้ง Dependencies
เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรัน:
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Server)
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### 3. ตรวจสอบความถูกต้องและสร้างเวอร์ชันผลิต (Production Build)
```bash
npm run build
```

---

## ✏️ How to Update Content (คู่มือการแก้ไขเนื้อหาเว็บไซต์)

คุณสามารถแก้ไขข้อมูลหน้าเว็บได้ง่ายๆ ผ่านการพิมพ์แก้ไขไฟล์ JSON ในโฟลเดอร์ `/data` โดยไม่ต้องเขียนโค้ดเพิ่มเติม:

*   **เพิ่ม/แก้ไขบทความ**: แก้ไขไฟล์ [data/blog.json](file:///d:/ldcode-website/data/blog.json)
*   **เพิ่มประเภทบริการ**: แก้ไขไฟล์ [data/services.json](file:///d:/ldcode-website/data/services.json)
*   **เพิ่มโปรเจกต์ผลงาน**: แก้ไขไฟล์ [data/projects.json](file:///d:/ldcode-website/data/projects.json)
*   **อัปเดตสถิติ/ช่องทางติดต่อ**: แก้ไขไฟล์ [data/company.json](file:///d:/ldcode-website/data/company.json)

---

## ☁️ Deployment on Vercel

โครงการนี้ถูกกำหนดค่าและพร้อมติดตั้งแบบไร้รอยต่อบน **Vercel**
อ่านคำแนะนำโดยละเอียดเพิ่มเติมในคู่มือ:
👉 **[vercel_deployment_guide.md](file:///C:/Users/THUGCOM/.gemini/antigravity-ide/brain/4ee28ce2-d80c-496a-b302-d995627f03da/vercel_deployment_guide.md)**
