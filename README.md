# Habitwise Backend
El deploy esta hecho en <a href="https://render.com">Render</a>.
## Datos relevantes
![imagen](https://github.com/SbleitZ/habitwise-backend/assets/72667973/d68c2f0a-10de-4aa0-80d8-16d6b15ba6f5)
### Como se usaron los datos
- En primera instancia, todos los datos generados tales como analytics y streaks vienen de el esquema Habit(que aparece en la imagen), analytics es generado en base a la información dada por el mismo usuario al terminar el día, la cuál hará un conteo de habitos completados/nocompletados y finalmente si existe algún habito no completado su streak finaliza lo que en dato se pasara como false, reiniciando su streak a 0.
- Para que estos datos no generen una repetición infinita es decir generar analiticas cada segundo, se creo una condición de que debe de pasar un día desde la ultima analitica generada, justamente por eso se guardan con una fecha de creación para luego hacer la comparación con la fecha en la que se genero un intento de analitica.
- Una propuesta me surgio y es que en vez de generar analiticas cada vez que el usuario cumpla la condición, es reutilizar una misma analitica, pero siento que la lectura seria horrible, por eso preferi mantenerlo todo separado, por legibilidad y facilitar el uso, además de no encontrar buenas razones para tenerlo en uno solo.
![imagen](https://github.com/SbleitZ/habitwise-backend/assets/72667973/19b50dd9-6077-4040-a937-28c670a5b3b9)
Para generar esos datos use los datos recopilados y el dato que me ofrece firebase, acontinuación pondre de donde salieron esos datos y como los converti(si es que es necesario):
- Total de días(Firebase): Firebase ofrece en su objeto `User` una propiedad llamada `creationTime` la cuál nos entrega la fecha en la que fue creada y junto con un calculo matematico se obtienen los días desde que se creo esa instancia el cual se dividira por `86400000 ms` que equivalen a 1 día
- Tu Racha/Mejor Racha(Backend): Estos datos fueron obtenidos en base a lo que se explico en `Como se usaron los datos`, por lo que solo era necesario hacer una llamada a la base de datos y manejarlo en el frontend.
- Categoria Favorita(Backend): Se obtuvo gracias a los datos de las analiticas las cuales almacenan la categoria de cada habito al momento de haberse generado, por lo tanto al tener un arreglo de más de una dimensión, tuve que usar el metodo flat, para convertirlo en uno de `1 dimensión` y lo siguiente a eso fue eliminar las categorias que estaban repetidas pero guardando la cantidad de repeticiones, para así conocer con exactitud cuantas de ellas se crearon.
  - La razón por la que elimine las que se repetian es la siguiente, por ejemplo si tenemos este arreglo `["Salud","Salud","Personal","Personal"]`, esto me dice que existieron 2 hábitos que tuvieron la categoria de Salud y otras 2 que tuvieron la categoria Personal, pero al momento de querer graficar esto se crearan 4 variable en total las cuales se representaran de forma individual, es decir existieron 4 categorias diferentes, pero claramente solo son 2 categorias las cuales se repitieron 2 veces, justamente por eso era necesario hacer esa "limpieza".
- Tasa de éxito(Backend): Para obtener estos datos use metodos de array tales como `reduce` y `map`, con los cuales conte la cantidad de habitos completados y no completados y luego de eso obtuve el total de habitos(no tenia otra forma ya que no guardaba la cantidad de forma individual, solo los que se muestran en la imagen 1), luego de eso obtuve la cantidad de habitos completados y finalmente hice un calculo matematico para obtener el porcentaje de "exito".
