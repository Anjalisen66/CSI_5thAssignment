import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
const Search = () => {
 let searchTerm = "Arijit Singh"
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songs = data?.tracks?.hits?.map((song) => song.track);
  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col bg-black ">
      {/* <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        <span className="font-black">{searchTerm}</span>
      </h2> */}
      <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
