#PRESENTACIÓN PRUEBA DE INGRESO:

##Escenario:

Usted tiene una tienda de colección de películas y desea mostrar a sus compañeros la colección disponible mediante el uso de una página Web. Dicha página permitirá que el público revise la colección a gusto. El usuario, si desea, debe poder hacer una búsqueda por nombre / título de una película en este catálogo. Además, la página debe poder desplegar el detalle de las películas.

##Requerimientos:

1. Como un usuario regular deseo poder ver el listado de colección de películas para así poder compararlo con mi listado.

      a. El listado debe contener la imagen (“poster”) de la película y su título/nombre.

2. Como un usuario regular deseo poder hacer una búsqueda de la colección por el título/nombre de la película.

      a. Debe tener un encasillado donde puedas introducir palabras claves y un botón para someter la búsqueda.

      b. Una vez sometida la búsqueda la búsqueda debe ser de toda película que contiene esa palabra clave.



##Generalidades del proyecto construido:

Se construye una aplicación web que brinda una API para poder consultar las películas por nombre y id; adicionalmente se agregar la funcionalidad para que la misma pueda servir los archivos estáticos del frontend.

###Arquitectura backend:

El backend se crea bajo el patrón de arquitectura hexagonal (Puertos y adaptadores) donde solo se tienen en cuenta las capas de presentación (Api), aplicación (Application) e infraestructura (Infraestructure). Es importante resaltar que en este caso se omite la capa de dominio ya que al tratarse de una plataforma que consume a un api de un tercero, esta no requiere lógica de negocio. adicionalmente se crea una capa de test que corresponde a los test de integración con la Api del tercero.

Es importante tener en cuenta que en el appsettings.json se establecen las variables de configuración como los son el key y la url

###Arquitectura frontend:

El frontend se crea en vanilla JavaScript y se trabaja con customs elements esto para poder hacer uso de etiquetas reutilizables, ya que al no hacer uso de frameworks, las mejores practicas corresponderían al desarrollo modular y haciendo uso del estándar opte por trabajar con los modulos y CustomElements de HTML5. El frontend es responsive y hace uso de css3.

El frontend se puede encontrar en la capa de Api en la carpeta "wwwroot"

Para ejecutar el proyecto desde la terminal desplácese hasta la capa de Api y una vez en dicha capa ejecute:

    dotnet run



####Para probar la Api desde swagger acceda desde el navegador a la URL:

https://localhost:44301/swagger/index.html



####Para acceder al frontend:

https://localhost:44301/index.html


Autor:  [IbarraOrtizDev](https://github.com/IbarraOrtizDev "IbarraOrtizDev")

Gracias...
