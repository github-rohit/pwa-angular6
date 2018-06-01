import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'tinymce-editor',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinymceEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() initialContent: String;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: 500,
      theme: 'modern',
      menubar: false,
      branding: false,
      autoresize_bottom_margin: 0,
      autoresize_min_height: 400,
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help autoresize'
      ],
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image, media | forecolor backcolor | code',
      image_advtab: true,
      skin_url: '../../assets/skins/lightgray',
      init_instance_callback: (editor: any) => {
          editor && this.initialContent && this.editor.setContent(this.initialContent)
      },
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

