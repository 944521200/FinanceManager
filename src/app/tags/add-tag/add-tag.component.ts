import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TagsSelectors from '../store/tags.selectors';
import * as TagsActions from '../store/tags.actions';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/model/tag.model';

@Component({
    selector: 'app-add-tag',
    templateUrl: './add-tag.component.html',
    styleUrls: ['./add-tag.component.css'],
})
export class AddTagComponent {
    constructor(private store: Store) {
        this.isEditing = this.store.select(TagsSelectors.selectEditing);
        this.editingTag = this.store.select(TagsSelectors.selectEditingTag);

        this.tagForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
            description: new FormControl(null, [Validators.maxLength(250)]),
            bgColor: new FormControl(1, [Validators.required]),
            txtColor: new FormControl(null, [Validators.required]),
        });
        setTimeout(() => {
            //Set default colors
            this.tagForm.patchValue({ txtColor: '#e6e6e6', bgColor: '#545454' });
        }, 0);

        this.editingTag.subscribe((editingTag) => {
            this.clearForm();
            this.tagForm.reset({
                name: editingTag.name,
                description: editingTag.description,
                bgColor: editingTag.bgColor,
                txtColor: editingTag.txtColor,
            });
        });
    }

    tagForm!: FormGroup;

    isEditing: Observable<boolean>;
    editingTag: Observable<Tag>;

    addTag() {
        const form = this.tagForm.value;

        this.store.dispatch(
            TagsActions.updateEditingTag({
                name: form['name'],
                description: form['description'],
                bgColor: form['bgColor'],
                txtColor: form['txtColor'],
            }),
        );

        this.store.dispatch(TagsActions.confirmEditingTag());

        this.clearForm();
    }

    clearForm() {
        this.tagForm.reset({ txtColor: '#e6e6e6', bgColor: '#545454' });
    }

    discardTag() {
        this.store.dispatch(TagsActions.discardEditingTag());
        this.clearForm();
    }
}
