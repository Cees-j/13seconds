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

    const normalize_file_name = (fileName) => {
        // Remove .mp3 extension
        let normalized = fileName.replace('.mp3', '')
        // Remove position suffixes (_START, _MID, _END)
        normalized = normalized.replace(/_(START|MID|END)$/, '')
        // Replace underscores with spaces
        normalized = normalized.replace(/_/g, ' ')
        // Trim any extra whitespace
        return normalized.trim()
    }


    const { data: files, error: listError } = await supabase.storage
        .from('taylor-swift-songs')
        .list()

    if (listError) {
        console.error('Error listing files:', listError)
    } else {
        // Print just the file names

        const game_length_in_questions = 15

        const random_files_sorted = files.sort(() => Math.random() - 0.5).slice(0, 40)

        const decoy_pool = shuffle(random_files_sorted.slice(game_length_in_questions,40))

        const answers_options_with_urls = await Promise.all(
          random_files_sorted.slice(0, game_length_in_questions).map(async (correctSong, i) => {
            const wrongAnswers = shuffle(decoy_pool.slice(0, 3))
            return {
              audioUrl: await getSignedUrl(correctSong.name),
              correctAnswer: normalize_file_name(correctSong.name),
              answer_options: shuffle([correctSong.name, ...wrongAnswers.map(w => w.name)].map(normalize_file_name))
            }
          })
        )
        // console.log(answers_options_with_urls);
        // console.log(answers_options_with_urls[0].audioUrl);
        return answers_options_with_urls

    }
}

//get_random_songs_from_server()

// so after creating room, and gathering songs, should populate that specific rooms questions / answers / urls?