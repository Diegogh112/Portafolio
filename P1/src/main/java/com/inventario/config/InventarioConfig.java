package com.inventario.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "inventario")
@Getter
@Setter
public class InventarioConfig {

    private MetodoInventario metodo = MetodoInventario.FIFO;

    public enum MetodoInventario {
        FIFO,
        LIFO
    }
}

