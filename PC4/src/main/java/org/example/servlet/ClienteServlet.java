package org.example.servlet;

import org.example.dao.ClienteDAO;
import org.example.dao.impl.ClienteDAOImpl;
import org.example.model.Cliente;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.util.List;

@WebServlet("/clientes")
public class ClienteServlet extends HttpServlet {

    private ClienteDAO clienteDAO;

    @Override
    public void init() {
        clienteDAO = new ClienteDAOImpl();
    }

    // ✅ MOSTRAR LISTA
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");

        if(action == null){
            action = "listar";
        }

        switch (action){

            case "nuevo":
                request.getRequestDispatcher("cliente-form.jsp")
                        .forward(request,response);
                break;

            case "editar":
                int idEditar = Integer.parseInt(request.getParameter("id"));
                Cliente cliente = clienteDAO.buscar(idEditar);

                request.setAttribute("cliente", cliente);
                request.getRequestDispatcher("cliente-form.jsp")
                        .forward(request,response);
                break;

            case "eliminar":
                int idEliminar = Integer.parseInt(request.getParameter("id"));
                clienteDAO.eliminar(idEliminar);
                response.sendRedirect("clientes");
                break;

            default:
                List<Cliente> lista = clienteDAO.listar();

                request.setAttribute("clientes", lista);
                request.getRequestDispatcher("clientes.jsp")
                        .forward(request,response);
        }
    }

    // ✅ GUARDAR / ACTUALIZAR
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String idStr = request.getParameter("id");

        Cliente cliente = new Cliente();

        cliente.setNombre(request.getParameter("nombre"));
        cliente.setApellido(request.getParameter("apellido"));
        cliente.setCorreo(request.getParameter("correo"));
        cliente.setTelefono(request.getParameter("telefono"));
        cliente.setTotalCompras(
                Double.parseDouble(request.getParameter("totalCompras"))
        );

        // INSERT o UPDATE
        if(idStr == null || idStr.isEmpty()){
            clienteDAO.crear(cliente);
        }else{
            cliente.setId(Integer.parseInt(idStr));
            clienteDAO.actualizar(cliente);
        }

        response.sendRedirect("clientes");
    }
}
