
# Chat Application with Socket.IO

Bu proje, kullanıcıların birbirleriyle gerçek zamanlı olarak mesajlaşabilmesini sağlayan basit bir sohbet uygulamasıdır. Socket.IO kullanarak özel mesajlaşma, kullanıcıların yazı yazıp yazmadığını gösterme ve kullanıcı yönetimi gibi özellikleri içerir.


## Özellikler

- **Gerçek Zamanlı Mesajlaşma**: Kullanıcılar, birbirleriyle anlık olarak mesajlaşabilir.
  
- **Kullanıcı Listesi**: Aktif kullanıcılar listesi sürekli olarak güncellenir.

- **Yazma Durumu Göstergesi**: Bir kullanıcı yazı yazmaya başladığında, diğer kullanıcıya "Yazıyor..." mesajı gösterilir.

- **Özel Mesajlaşma**: Kullanıcılar, yalnızca seçtikleri kişiyle özel olarak sohbet edebilir.


## Teknolojiler

**Frontend:** React.js, Socket.IO-client, Tailwind CSS

**Backend:** Node.js, Express.js, Socket.IO

**Veritabanı:** Yok (Veriler sadece geçici olarak bellekte tutulur)


## API Kullanımı

## Kurulum

### 1. Backend (Sunucu) Kurulumu

1. **Backend Klasörüne Gitme**  
   Backend klasörüne gidin.

2. **Gerekli Paketlerin Yüklenmesi**  
   Terminalde aşağıdaki komutu çalıştırarak gerekli paketleri yükleyin:
   ```bash
   npm install

3. **Sunucuyu Başlatma**  
   Sunucuyu başlatmak için aşağıdaki komutu çalıştırın:
   ```bash
   npm run dev

Bu komut, sunucuyu http://localhost:3001 adresinde çalıştıracaktır.

### 2. Frontend (İstemci) Kurulumu

1. **Frontend Klasörüne Gitme**  
   Frontend klasörüne gidin.

2. **Gerekli Paketlerin Yüklenmesi**  
   Terminalde aşağıdaki komutu çalıştırarak gerekli paketleri yükleyin:
   ```bash
   npm install

3. **Uygulamayı Başlatma**  
   Uygulama başlatmak için aşağıdaki komutu çalıştırın:
   ```bash
   npm run dev

Bu komut, React uygulamasını http://localhost:5173 adresinde çalıştıracaktır.

  
