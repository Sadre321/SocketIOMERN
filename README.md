Chat Application with Socket.IO
Bu proje, kullanıcıların birbirleriyle gerçek zamanlı olarak mesajlaşabilmesini sağlayan basit bir sohbet uygulamasıdır. Socket.IO kullanarak özel mesajlaşma, kullanıcıların yazı yazıp yazmadığını gösterme ve kullanıcı yönetimi gibi özellikleri içerir.

Özellikler
Gerçek Zamanlı Mesajlaşma: Kullanıcılar, birbirleriyle anlık olarak mesajlaşabilir.

Kullanıcı Listesi: Aktif kullanıcılar listesi sürekli olarak güncellenir.

Yazma Durumu Göstergesi: Bir kullanıcı yazı yazmaya başladığında, diğer kullanıcıya "Yazıyor..." mesajı gösterilir.

Özel Mesajlaşma: Kullanıcılar sadece seçtikleri kişiyle özel olarak sohbet edebilir.

Teknolojiler
Frontend: React.js, Socket.IO-client, Tailwind CSS

Backend: Node.js, Express.js, Socket.IO

Veritabanı: Yok (Veriler sadece geçici olarak bellekte tutulur)

Kurulum
1. Backend (Sunucu) Kurulumu
backend klasörüne gidin.

Gerekli paketleri yüklemek için terminalde şu komutu çalıştırın:

bash
Kopyala
Düzenle
npm install
Sunucuyu başlatmak için aşağıdaki komutu çalıştırın:

bash
Kopyala
Düzenle
npm start
Bu, sunucuyu http://localhost:3001 adresinde çalıştıracaktır.

2. Frontend (İstemci) Kurulumu
frontend klasörüne gidin.

Gerekli paketleri yüklemek için terminalde şu komutu çalıştırın:

bash
Kopyala
Düzenle
npm install
Uygulamayı başlatmak için aşağıdaki komutu çalıştırın:

bash
Kopyala
Düzenle
npm run dev
Bu, React uygulamasını http://localhost:5173 adresinde çalıştıracaktır.

Kullanım
Kullanıcı Girişi: Her kullanıcı bir bağlantı oluşturduğunda, sistem ona benzersiz bir ID atar. Kullanıcılar bu ID'leri üzerinden diğerleriyle iletişim kurarlar.

Kullanıcı Seçimi: Sol tarafta, aktif kullanıcıların listesi gösterilir. Kullanıcılar listeden bir kişiyi seçerek onunla mesajlaşmaya başlarlar.

Mesaj Gönderme: Seçilen kullanıcıya mesaj gönderebilir ve anlık olarak yazıp yazmadığını görebilirsiniz.

Yazma Durumu
Kullanıcı yazmaya başladığında, "Yazıyor..." mesajı görünür. Yazmayı bitirdikten sonra, yazma durumu sona erer.

Proje Yapısı
markdown
Kopyala
Düzenle
/frontend
  /src
    - App.tsx
    - index.tsx
    - [Componentler ve yardımcı dosyalar]
  
/backend
  - server.ts
  - [Express ve Socket.IO ile ilgili dosyalar]
Katkıda Bulunma
Bu projeye katkıda bulunmak isterseniz, lütfen önce bir fork oluşturun.

Yapmak istediğiniz değişiklikleri kendi fork'ınızda yapın.

Değişikliklerinizi göndermeden önce, pull request göndermeden önce main branch'ine güncellemeler yapmayı unutmayın.
