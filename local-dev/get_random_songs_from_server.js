import 'dotenv/config';

import { supabase } from "../src/lib/supabase.js";


// List all files in the bucket
export const get_random_songs_from_server = async () => {

    const getSignedUrl = async (fileName) => {
        const { data, error } = await supabase.storage
          .from('taylor-swift-songs')
          .createSignedUrl(fileName, 3600)
        return data?.signedUrl || null
      }

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }


    const { data: files, error: listError } = await supabase.storage
        .from('taylor-swift-songs')
        .list()

    if (listError) {
        console.error('Error listing files:', listError)
    } else {
        // Print just the file names

        const random_files_sorted = files.sort(() => Math.random() - 0.5).slice(0, 10)

        const decoy_pool = random_files_sorted.slice(10,40)

        const questions = random_files_sorted.slice(0, 2).map((correctSong, i) => {
            const startIdx = 2 + (i * 3) // grab 3 unique decoys per question
            console.log('Start index:', startIdx)
            const wrongAnswers = random_files_sorted.slice(startIdx, startIdx + 3)
            console.log('Wrong answers:', wrongAnswers)
            return {
              audioUrl: getSignedUrl(correctSong.name),
              correctAnswer: correctSong.name,
              options: shuffle([correctSong.name, ...wrongAnswers.map(w => w.name)])
            }
          })
          console.log('Questions:', questions)
          console.log(getSignedUrl(correctSong.name))
    }
}

get_random_songs_from_server()