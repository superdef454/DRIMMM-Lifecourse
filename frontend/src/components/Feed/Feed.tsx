import classes from './Feed.module.scss';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadUploadEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import moment from 'moment';
import { localStorageNames } from '../../main/constants/localStorageNames.ts';
import { FeedDataList } from './FeedDataList.tsx';
import { FeedFilters } from './FeedFilters.tsx';

export const Feed = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagsParam, setTagsParam] = useState<number[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const [addPostMode, setAddPostMode] = useState(false);

  const [feedTitle, setFeedTitle] = useState('');
  const [feedDescription, setFeedDescription] = useState('');

  const onTemplateSelect = (e: FileUploadUploadEvent) => {
    let _totalSize = totalSize;
    const files = e.files;

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach(file => {
      _totalSize += file.size || 0;
    });
  };

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };
  const handleChip = (title: string) => {
    if (tags.includes(title)) {
      setTags(prevState => prevState.filter(el => el != title));
    } else {
      setTags(prevState => [...prevState, title]);
    }
  };
  const paramHandleChip = (id: number) => {
    if (tagsParam.includes(id)) {
      setTagsParam(prevState => prevState.filter(el => el != id));
    } else {
      setTagsParam(prevState => [...prevState, id]);
    }
  };
  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current ? (fileUploadRef.current as any).formatSize(totalSize) : '0 B';
    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    );
  };
  const itemTemplate = (inFile: object, props: any) => {
    const file = inFile as File;
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          // @ts-ignore
          <img alt={file.name} role="presentation" src={(file as any).objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };
  const parseDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD h:mm:ss');
  };
  const addPost = () => {
    axios
      .post(
        'http://localhost:8080/api/admin/publication/create',
        {
          event_type: tags[0],
          title: feedTitle,
          // @ts-ignore
          uid_keycloak_user: JSON.parse(window.localStorage.getItem(localStorageNames.ALL)).session_state,
          description: feedDescription,
          date: parseDate(new Date()),
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => console.log(res));
  };

  return (
    <div>
      <div style={addPostMode ? { display: 'none' } : { display: 'flex' }}>
        <Button className={classes.addFeed_button} onClick={() => setAddPostMode(true)}>
          Создать пост
        </Button>
        <div className={classes.tagsGroupParam}>
          <Chip
            label={'Спорт'}
            onClick={() => paramHandleChip(1)}
            style={
              tagsParam.includes(1)
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Наука'}
            onClick={() => paramHandleChip(2)}
            style={
              tagsParam.includes(2)
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Творчество'}
            onClick={() => paramHandleChip(3)}
            style={
              tagsParam.includes(3)
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Волонтерство'}
            onClick={() => paramHandleChip(4)}
            style={
              tagsParam.includes(4)
                ? { backgroundColor: 'slateblue', color: 'white', transition: '0.5s' }
                : { transition: '0.5s' }
            }
          />
        </div>
      </div>

      <div style={addPostMode ? { display: 'block' } : { display: 'none' }} className={classes.addFeed}>
        <h3 className={classes.fileLabel}>Создание поста</h3>
        <div className={classes.fileLabel}>Заголовок поста</div>
        <InputTextarea autoResize value={feedTitle} onChange={e => setFeedTitle(e.target.value)} rows={3} cols={30} />

        <div>
          <div className={classes.fileLabel}>Текст поста</div>
          <Editor
            value={feedDescription}
            onTextChange={(e: any) => setFeedDescription(e.htmlValue)}
            style={{ height: '320px' }}
          />
        </div>
        <div className={classes.fileLabel}>Прикрепить фото к посту</div>
        <div>
          <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
          <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
          <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

          <FileUpload
            ref={fileUploadRef}
            name="demo[]"
            url="/api/upload"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onTemplateUpload}
            // @ts-ignore
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </div>
        <div className={classes.fileLabel}>Добавить тег</div>
        <div className={classes.tagsGroup}>
          <Chip
            label={'Спорт'}
            onClick={() => handleChip('Спорт')}
            style={
              tags.includes('Спорт')
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Наука'}
            onClick={() => handleChip('Наука')}
            style={
              tags.includes('Наука')
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Творчество'}
            onClick={() => handleChip('Творчество')}
            style={
              tags.includes('Творчество')
                ? {
                    backgroundColor: 'slateblue',
                    color: 'white',
                    transition: '0.5s',
                  }
                : {}
            }
          />
          <Chip
            label={'Волонтерство'}
            onClick={() => handleChip('Волонтерство')}
            style={
              tags.includes('Волонтерство')
                ? { backgroundColor: 'slateblue', color: 'white', transition: '0.5s' }
                : { transition: '0.5s' }
            }
          />
        </div>
        <div className={classes.addFeed__buttonGroup}>
          <Button label="Опубликовать" onClick={() => addPost()} />
          <Button label="Отмена" outlined onClick={() => setAddPostMode(false)} />
        </div>
      </div>
      <div className={classes.feedPage}>
        <FeedDataList />
        <FeedFilters />
      </div>
    </div>
  );
};
