import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

//Components
import ImageUpload from './PostForm/ImageUpload';
import TextInputs from './PostForm/TextInputs';
import TabItem from './TabItem';

//Icons
import { Post } from '@/atoms/postsAtoms';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { firestore, storage } from '@/firebase/clientApp';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import useSelectFile from '@/hooks/useSelectFile';

interface NewPostFormProps {
  user: FirebaseUser;
}

const formTabs: tabType[] = [
  {
    label: 'Post',
    icon: IoDocumentText,
  },
  {
    label: 'Image & Video',
    icon: IoImageOutline,
  },
  {
    label: 'Link',
    icon: BsLink45Deg,
  },
  {
    label: 'Poll',
    icon: BiPoll,
    disabled: true,
  },
  {
    label: 'Talk',
    icon: BsMic,
    disabled: true,
  },
];

export type tabLabels = 'Post' | 'Image & Video' | 'Link' | 'Poll' | 'Talk';
export type tabType = { label: tabLabels; icon: IconType; disabled?: boolean };

interface inputType {
  title: string;
  body: string;
}

const NewPostForm: FunctionComponent<NewPostFormProps> = (props) => {
  const { user } = props;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<tabLabels>('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { selectedFile, onSelectFile, setSelectedFile } = useSelectFile();

  // Submit Post to Firebase
  const handleCreatePost = async () => {
    // grab all necessary data
    const { communityId } = router.query;
    const { title, body } = textInput;
    const { uid, email } = user;

    // create post object for firestore
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: uid,
      creatorDisplayName: email!.split('@')[0],
      title: title,
      body: body,
      numberOfComments: 0,
      voteStatus: 1,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);

    try {
      // add the post to the firestore
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      if (selectedFile) {
        // location of the image in the storage
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        // upload the image to the storage
        await uploadString(imageRef, selectedFile, 'data_url');
        // get the download url of the image
        const downloadURL = await getDownloadURL(imageRef);

        // update the post object with the image url
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error) {
      console.error('Error adding Post: ', error);
      setError(true);
    }

    setLoading(false);
  };

  // ActiveTab Post
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      <Flex>
        {formTabs.map((tab: tabType, index) => (
          <TabItem tab={tab} key={index} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>
      <Flex p={4}>
        {activeTab === 'Post' && (
          <TextInputs
            textInput={textInput}
            handleCreatePost={handleCreatePost}
            onTextChange={onTextChange}
            loading={loading}
          />
        )}

        {activeTab === 'Image & Video' && (
          <ImageUpload
            onSelectImage={onSelectFile}
            selectedFile={selectedFile}
            setActiveTab={setActiveTab}
            setSelectedFile={setSelectedFile}
          />
        )}
        {activeTab === 'Link' && <Text>Link Tab</Text>}
      </Flex>
      {error && (
        <Alert status='error' display='flex' justifyContent='center'>
          <AlertIcon />
          <Text>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
