import { useState } from "react";
import { Formik, Form,  Field } from "formik";
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url);
  console.log({photos});
  return (
    <div>
      <header>
        <Formik
        initialValues={{search: ''}}
          onSubmit={async values => {
            const responseApi = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 8umKQUq60SgMlpaUTj5TzSY4hrV7RXTr6enCHzHisOI'
              }
            })
            const data = await responseApi.json()
            // llamada a api de unsplash
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
          <div className="center">
          {photos.map(foto => <article key={foto.id} onClick={() => open(foto.links.html)} >
            <img src={foto.urls.regular} />
            <p>{[foto.description, foto.alt_description].join('-')}</p>
          </article>)}

          </div>
      </div>
    </div>
  );
}

export default App;
