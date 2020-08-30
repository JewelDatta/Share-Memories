from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from django.contrib.auth import get_user_model
import json


class AccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup(self):
        data = json.dumps({
            "username": "testusername",
            "email": "testuser@example.com",
            "password1": "testpass12",
            "password2": "testpass12"
        })
        response = self.client.post(
            '/api/auth/registration/', data, content_type='application/json')

        testuser = get_user_model().objects.get(username="testusername")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(testuser.username, "testusername")
        self.assertEqual(testuser.email, "testuser@example.com")
        self.assertTrue(testuser.check_password("testpass12"))
