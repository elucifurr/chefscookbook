import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center ">The Best Recipes</span>
        <p className="desc text-center">Chef's Cookbook is an open-source recipe tool for the modern world to discover and share great recipes</p>

        <Feed  />

      </h1>
    </section>
  )
}

export default Home
