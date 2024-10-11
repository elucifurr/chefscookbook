import { connectToDB } from "@utils/database"
import Recipe from "@models/recipe"

export const POST = async (req, res) => {
    const { userId, title, content, tag} = await req.json()

    try {
        await connectToDB()
        const newRecipe = new Recipe({
            creator: userId,
            title,
            content,
            tag
        })

        await newRecipe.save()
    
        return new Response(JSON.stringify(newRecipe), {status: 201})

    } catch (error) {
        return new Response("Failed to create new recipe", {status: 500})
    }

}