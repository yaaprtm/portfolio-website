---
title: "Integrasi REST API Menggunakan Java, Retrofit, dan OkHttp di Android Native"
date: "2026-08-26"
category: "Android"
summary: "Arsitektur bersih (clean code) konsumsi REST API pada aplikasi Android Native menggunakan bahasa pemrograman Java, library Retrofit 2, Gson Converter, dan logging OkHttp."
slug: "integrasi-rest-api-android-java-retrofit"
---

# Integrasi REST API Menggunakan Java, Retrofit, dan OkHttp di Android Native

Dalam pengembangan aplikasi mobile Android modern, pertukaran data antara aplikasi klien dan server backend hampir selalu dilakukan melalui protokol **HTTP/HTTPS** dengan format pertukaran data **JSON (JavaScript Object Notation)**.

Dalam proyek pengembangan aplikasi Android native menggunakan bahasa **Java**, library **Retrofit 2** dari Square merupakan standar industri *type-safe HTTP client* yang paling efisien, bersih, dan mudah dikelola dibandingkan pendekatan manual menggunakan `HttpURLConnection` atau `AsyncTask` yang sudah *deprecated*.

---

## 1. Menambahkan Dependencies pada `build.gradle`

Tambahkan library Retrofit, Gson Converter, dan OkHttp Logging Interceptor ke dalam file `app/build.gradle`:

```groovy
dependencies {
    // Retrofit 2 & GSON Converter
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    // OkHttp Logging Interceptor
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
}
```

Pastikan izin akses internet sudah terdaftar pada `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

## 2. Membuat Data Model (POJO)

Misalkan kita ingin mengonsumsi endpoint data tanaman `/api/v1/flora`:

```java
package com.kebunraya.app.model;

import com.google.gson.annotations.SerializedName;

public class Plant {
    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("scientific_name")
    private String scientificName;

    @SerializedName("category")
    private String category;

    // Constructor
    public Plant(int id, String name, String scientificName, String category) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.category = category;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getScientificName() { return scientificName; }
    public String getCategory() { return category; }
}
```

---

## 3. Mendefinisikan Interface API Service

```java
package com.kebunraya.app.network;

import com.kebunraya.app.model.Plant;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @GET("api/v1/flora")
    Call<List<Plant>> getAllPlants(@Query("category") String category);

    @GET("api/v1/flora/{id}")
    Call<Plant> getPlantDetail(@Path("id") int plantId);
}
```

---

## 4. Konfigurasi Singleton Retrofit Client

Gunakan pola desain **Singleton Pattern** untuk memastikan hanya ada satu instance `Retrofit` dan `OkHttpClient` selama daur hidup aplikasi:

```java
package com.kebunraya.app.network;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import java.util.concurrent.TimeUnit;

public class ApiClient {
    private static final String BASE_URL = "https://api.kebunraya.id/";
    private static Retrofit retrofit = null;

    public static ApiService getApiService() {
        if (retrofit == null) {
            // Logging Interceptor untuk debug network request/response di Logcat
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
            logging.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(logging)
                    .connectTimeout(15, TimeUnit.SECONDS)
                    .readTimeout(15, TimeUnit.SECONDS)
                    .build();

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client)
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}
```

---

## 5. Menjalankan Request Asinkron di Activity / Fragment

Untuk mencegah aplikasi mengalami *ANR (Application Not Responding)*, panggilan jaringan harus dieksekusi secara asinkron di *background thread* menggunakan metode `enqueue`:

```java
package com.kebunraya.app;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.kebunraya.app.model.Plant;
import com.kebunraya.app.network.ApiClient;
import com.kebunraya.app.network.ApiService;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.progressBar);
        fetchPlantData();
    }

    private void fetchPlantData() {
        progressBar.setVisibility(View.VISIBLE);

        ApiService apiService = ApiClient.getApiService();
        Call<List<Plant>> call = apiService.getAllPlants("koleksi-unggulan");

        // Eksekusi asinkron
        call.enqueue(new Callback<List<Plant>>() {
            @Override
            public void onResponse(Call<List<Plant>> call, Response<List<Plant>> response) {
                progressBar.setVisibility(View.GONE);

                if (response.isSuccessful() && response.body() != null) {
                    List<Plant> plantList = response.body();
                    Log.d(TAG, "Data berhasil diambil: " + plantList.size() + " items");
                    // Kirim data ke RecyclerView Adapter
                } else {
                    Toast.makeText(MainActivity.this, 
                        "Error Code: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Plant>> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                Log.e(TAG, "Network Request Failed: ", t);
                Toast.makeText(MainActivity.this, 
                    "Koneksi gagal: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
```

---

## 6. Kesimpulan & Keunggulan Pendekatan Ini

1. **Type-Safe Serialization**: Gson secara otomatis mengonversi struktur JSON langsung menjadi objek Java (POJO) tanpa perlu parsing string manual (`JSONObject` / `JSONArray`).
2. **Built-in Thread Management**: Callback `onResponse` dan `onFailure` secara otomatis dijalankan kembali di **Android Main Thread (UI Thread)**, sehingga aman untuk langsung memperbarui elemen tampilan UI seperti TextView, RecyclerView, atau ProgressBar.
