﻿using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Business.Constants
{
    public static class Messages
    {
        public static string BrandAdded = "Marka eklendi";
        public static string BrandDeleted = "Marka silindi";
        public static string BrandUpdated = "Marka güncellendi";
        public static string CarAdded = "Araba eklendi";
        public static string CarDidntAdd = "Araba eklenemedi";
        public static string CarDeleted = "Araba silindi";
        public static string CarsListed = "Arabalar listelendi";
        public static string CarGot = "Araba getirildi";
        public static string CarsGotByBrandId = "Arabalar markaya göre getirildi";
        public static string CarsGotByColorId = "Arabalar renge göre getirildi";
        public static string CarUpdated = "Araba bilgileri güncellendi";
        public static string CarDetailsGot = "Araba detayları getirildi";
        public static string CarDetailsFilterByBrandId ="Arabalar markaya göre listelendi";
        public static string CarDetailsFilterByBrandIdAndColorId = "Arabalar marka ve renge göre listelendi";
        public static string CarDetailsFilterByColorId = "Arabalar renge göre listelendi";
        public static string ColorAdded = "Renk eklendi";
        public static string ColorDeleted = "Renk silindi";
        public static string ColorsListed = "Renkler listelendi";
        public static string ColorGot = "Renk getirildi";
        public static string CarNotExists = "Araba bulunamadı";
        public static string ColorUpdated = "Renk güncellendi";
        public static string UserAdded = "Kullanıcı eklendi";
        public static string UserDeleted = "Kullanıcı silindi";
        public static string UsersListed = "Kullanıcılar listelendi";
        public static string UserGotById = "Kullanıcı id'ye göre getirildi";
        public static string UserUpdated = "Kullanıcı bilgileri güncellendi";
        public static string CustomerAdded = "Müşteri eklendi";
        public static string CustomerDeleted = "Müşteri silindi";
        public static string CustomersListed = "Müşteriler listelendi";
        public static string CustomerGot = "Müşteri id'ye göre getirildi";
        public static string CustomerUpdated = "Müşteri bilgileri güncellendi";
        public static string RentalAdded = "Araba kiralandı";
        public static string RentalDeleted = "Kiralama silindi";
        public static string RentalsListed = "Kiralamalar listelendi";
        public static string RentalGot = "Kiralama getirildi";
        public static string RentalUpdated = "Kiralama bilgisi güncellendi";
        public static string RentalCarAlreadyRented = "Araç zaten kiralanmış";
        public static string CarImagesLimitExceeded = "Araba resim limiti doldu";
        public static string CarImageDeleted = "Araba resmi silindi";
        public static string CarImageUpdated = "Araba resmi güncellendi";
        public static string UserRegistered = "Üyelik başarılı";
        public static string PasswordError = "Şifre hatalı";
        public static string SuccessfulLogin = "Giriş başarılı";
        public static string UserAlreadyExists = "Kullanıcı zaten var";
        public static string AccessTokenCreated = "Token oluşturuldu";
        public static string AuthorizationDenied = "Yetki yok";
        public static string UserNotFound = "Kullanıcı bulunamadı";
        public static string UserOperationClaimAdded = "Kullanıcı rolü eklendi";
        public static string UserOperationClaimDeleted = "Kullanıcı rolü silindi";
        public static string UserOperationClaimListed = "Kullanıcı rolleri listelendi";
        public static string UserOperationClaimGot = "Kullanıcı rolü Id'ye göre getirildi";
        public static string UserOperationClaimUpdated = "Kullanıcı rolü güncellendi";

    }
}
