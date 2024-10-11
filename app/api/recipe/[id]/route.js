import Recipe from "@models/recipe";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const recipe = await Recipe.findById(params.id).populate("creator")
        if (!recipe) return new Response("Recipe Not Found", { status: 404 });

        return new Response(JSON.stringify(recipe), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, content, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing recipe by ID
        const existingRecipe = await Recipe.findById(params.id);

        if (!existingRecipe) {
            return new Response("Recipe not found", { status: 404 });
        }

        // Update the recipe with new data
        existingRecipe.title = title;
        existingRecipe.content = content;
        existingRecipe.tag = tag;

        await existingRecipe.save();

        return new Response("Successfully updated the Recipes", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Recipe", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the recipe by ID and remove it
        await Recipe.findByIdAndRemove(params.id);

        return new Response("Recipe deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting recipe", { status: 500 });
    }
};