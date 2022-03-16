# AnimeApp-TDD-CleanArch

## This application was developed with the focus of putting into practice the methodology of TDD (Test Driven Development), Clean Architecture and Architecture Pattern MVP (Model View Presenter).

### **Before we start, let's learn a little about:**

> *Test-driven development (**TDD**), also called test-driven design, is a method of implementing software programming that weaves unit testing, programming, and refactoring into source code. (font: [https://searchsoftwarequality.techtarget.com/definition/test-driven-development](https://searchsoftwarequality.techtarget.com/definition/test-driven-development))*
> 

> ***Clean Architecture** is a software architecture proposed by Robert Cecil Martin (or Uncle Bob, as he is better known) that aims to standardize and organize the developed code, favoring its reusability, as well as technology independence. (font: [https://www.zup.com.br/blog/clean-architecture-arquitetura-limpa](https://www.zup.com.br/blog/clean-architecture-arquitetura-limpa))*
> 

> *The **MVP** pattern is very similar to the MVC pattern. In this architectural pattern “p” represents the presenter. So it has parts like MVC, but here the controller is replaced by the presenter, although they don't perform the same function. The presenter can address all UI events on behalf of the view. It takes input from users, proceeds with the data in the Model, and then transforms the results back in the View. (font: [https://medium.datadriveninvestor.com/model-view-presenter-mvp-5c3439227f83](https://medium.datadriveninvestor.com/model-view-presenter-mvp-5c3439227f83))*
> 

### About implementation

For the development, **React Native** with **Typescript** was used, where the implementation was mainly focused on the IOS. As already mentioned, the main objective of this application is to put into practice good concepts of clean architecture and test-based development, covering 100 percent of the code with unit tests, in addition to containing integration tests, I will not go into much depth, but we will go through the main points of development.

**About architecture**

As you may already know, it was chosen to use the MVP (Model View Presenter) architecture pattern with a focus on a Clean Architecture.

Briefly, we followed the concepts of Clean Architecture where we started the development in the Domain and added the other layers around it, always pointing towards the Domain, following the flow of the layers. Where the dependencies of libraries etc., are in the outermost layer connecting through Adapters.

In addition to the concept of Clean Architecture, we use the MVP pattern, where for the case of React Native we do not give up the use of hooks, thus adapting the pattern a little to suit our case, so Presenter would do both the role both the presenter and the UI.

This was the Architecture diagram built to follow as a basis for development:

![AnimeApp-Arch.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/90762bc7-71ef-4c3d-b4e9-75093317131d/Captura_de_Tela_2022-03-14_as_19.15.41.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T221647Z&X-Amz-Expires=86400&X-Amz-Signature=9b36ee87d24bea3a516c33ea26daa6819ff848f34fd448b5529b550b05039ccc&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Captura%2520de%2520Tela%25202022-03-14%2520a%25CC%2580s%252019.15.41.png%22&x-id=GetObject)

**About the Tests**

Also as already mentioned, we follow the test-driven development methodology, where the unit tests follow the same development architecture, with the only difference that instead of testing only Presentation, we decided to divide these tests into UI and Presentation. Also, by using TDD, it was easier to cover the project with 100 percent tests, in addition to writing some integration tests.

To write the tests, **jest** and **react-native-testing-library** were used.

![AnimeApp-Tests.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2d0b5ccb-06ca-48a5-9cdf-09e0cca8df70/AnimeApp-Tests.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T162707Z&X-Amz-Expires=86400&X-Amz-Signature=05d6e3100055011bb3fadef62ed7a4cc43dac73e9dbdd139aee6b7e581f83c39&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22AnimeApp-Tests.png%22&x-id=GetObject)

### About the project

AnimeApp is an application that consumes information from [AniAPI](https://aniapi.com/), where you can receive a list of the most diverse animes, in addition to being able to view more detailed information.

<p align="flex-start">
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/01c9f2cb-9370-4016-bc60-b601a4e4ef29/AnimeApp-Authentication.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T162833Z&X-Amz-Expires=86400&X-Amz-Signature=c244e3633e38a144b968aacdd8d0c7b00991deb7cb54705e6640ac866d7326c4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22AnimeApp-Authentication.png%22&x-id=GetObject" width="225" height="487" />
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/631836af-2554-444e-ac88-41f4c0c1b513/AnimeApp-Animes.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220316T121532Z&X-Amz-Expires=86400&X-Amz-Signature=a6a6c93a6a72182a60385632ee6b3660f2987756c016c2c4f4d42ee6bc6b45a9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22AnimeApp-Animes.png%22&x-id=GetObject" width="225" height="487" />
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/95f18968-dd56-46dd-9617-d589537a535e/AnimeApp-AnimeDetail.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220316T121540Z&X-Amz-Expires=86400&X-Amz-Signature=1222a113b2d1b8363b11ca1a866ed18989fad2399d8cea031997d970fd0a794e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22AnimeApp-AnimeDetail.png%22&x-id=GetObject" width="225" height="487" />
</p>

The development focused only on IOS, but theoretically it is to run on Android without many problems.

About the folder structure:

![AnimeApp-Structure.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7ff47a08-5b0b-4f28-a817-b52c4d9eb145/AnimeApp-Structure.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220316T121738Z&X-Amz-Expires=86400&X-Amz-Signature=97e9dbabb7b6dc006814c091bb8451b35dd69d19b104e35059c5d994bd8856ce&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22AnimeApp-Structure.png%22&x-id=GetObject)

### Build

Now the grand finale, in the root of the project, run:

```bash
yarn
```

So depending on the platform you want to run the project on, just run:

```bash
yarn android
```

```bash
yarn ios
```

### Thanks and Contact

Finally, I want to thank [Rodrigo Manguinho](https://github.com/rmanguinho) for having served as a basis for the knowledge applied here, mainly through the video [Clean Architecture in React.Js](https://www.youtube.com/watch?v=iUQVZHzqGuc&t=1166s).

To contact me, you can use:
- Instagram: [@marlonbelomarques](https://www.instagram.com/marlonbelomarques)
- Linkedin: [Marlon Marques](https://www.linkedin.com/in/marlon-marques-0b509813b/)
