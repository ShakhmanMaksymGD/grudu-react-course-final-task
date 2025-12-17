import React from "react";
import DOMPurify from "dompurify";
import { useFormValidation, validationRules } from "../../hooks/useFormValidation";
import "./AddTweetForm.css";
import { useFetch } from "../../hooks/useFetch";
import { Textarea } from "../ui/Textarea";
import { tweetService } from "../../services/tweetService";
import { useAuth, User } from "../../contexts/AuthContext";
import { useTweets } from "../../contexts/TweetsContext";
import { Button } from "../ui/Button";

type AddTweetFormData = {
  tweet: string;
}

const initialValues: AddTweetFormData = {
  tweet: ""
};

const addTweetValidationRules = {
  tweet: validationRules.tweet,
};

const AddTweetForm: React.FC = () => {
  const {
    formData,
    errors,
    handleFieldChange,
    handleFieldBlur,
    validateAllFields,
    resetForm
  } = useFormValidation({
    initialValues,
    validationRules: addTweetValidationRules
  });

  const { execute, error: createTweetError } = useFetch(tweetService.createTweet);
  const { user } = useAuth() as { user: User };
  const { triggerRefresh } = useTweets();

  const handleTweetClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const isValid = validateAllFields();
        
    if (isValid) {
      try {
        const payload = {
          author_id: user.id,
          text: DOMPurify.sanitize(formData.tweet.trim())
        }
        console.log("payload", payload);
        await execute(payload);
        
        // Clear the form and trigger tweet list refresh
        resetForm();
        triggerRefresh();
      } catch {
        return;
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <div className="tweet-form">
      <Textarea
        placeholder="What's happening?"
        name="tweet"
        value={formData["tweet"]}
        error={errors["tweet"]}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />
      <Button onClick={handleTweetClick} className="tweet-form-button">Tweet</Button>
      {createTweetError && <div className="error">{createTweetError}</div>}
    </div>
  );
}

export default AddTweetForm;