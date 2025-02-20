import { useEffect, useState } from "react";

export const useReview = (modelId) => {
  const [modelid, setmodelid] = useState(null);

  useEffect(() => {
    if (modelId === null) {
      return;
    }
    fetch(
      `https://www.adidas.co.in/api/models/${modelId}/reviews?bazaarVoiceLocale=en_IN&feature&includeLocales=en%2A&limit=0&offset=0&sort=newest`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setmodelid(data);
      });
  }, [modelId]);

  return modelid;
};
