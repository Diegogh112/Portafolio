package org.example.servlet;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.dao.ClienteDAO;
import org.example.dao.impl.ClienteDAOImpl;
import org.example.model.Cliente;

import javax.swing.text.Document;
import java.awt.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/clientes-pdf")
public class ClientePdfServlet extends HttpServlet {
    private ClienteDAO clienteDAO = new ClienteDAOImpl();

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        List<Cliente> clientes = clienteDAO.listar();

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition",
                "attachment; filename=clientes.pdf");

        PdfWriter writer = new PdfWriter(response.getOutputStream());
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // ⭐ LOGO (pon la imagen en resources o en el proyecto)
        try {
            Image logo = new Image(
                    ImageDataFactory.create("C:/imagenes/cjava.png"));
            logo.setWidth(120);
            document.add(logo);
        } catch (Exception e) {
            document.add(new Paragraph("Logo no encontrado"));
        }

        // Título
        Paragraph titulo = new Paragraph("REPORTE DE CLIENTES")
                .setBold()
                .setFontSize(18)
                .setTextAlignment(TextAlignment.CENTER);

        document.add(titulo);
        document.add(new Paragraph("\n"));

        // Tabla
        Table tabla = new Table(5);

        tabla.addHeaderCell("ID");
        tabla.addHeaderCell("Nombre");
        tabla.addHeaderCell("Correo");
        tabla.addHeaderCell("Telefono");
        tabla.addHeaderCell("Total Compras");

        for (Cliente c : clientes) {
            tabla.addCell(String.valueOf(c.getId()));
            tabla.addCell(c.getNombre());
            tabla.addCell(c.getCorreo());
            tabla.addCell(c.getTelefono());
            tabla.addCell(String.valueOf(c.getTotalCompras()));
        }

        document.add(tabla);
        document.close();
    }
}